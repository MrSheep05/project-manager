--liquibase formatted sql

-- changeset liquibase:add_project_procedure endDelimiter://
CREATE PROCEDURE `AddProject`(IN `in_connection_id` VARCHAR(256), IN `in_status_id` VARCHAR(36), IN `in_categories_id` TEXT, IN `in_title` TINYTEXT CHARACTER SET utf8mb4, IN `in_content` LONGTEXT CHARACTER SET utf8mb4)
BEGIN   
DECLARE in_user_id VARCHAR(256);
DECLARE i INT DEFAULT 0;
DECLARE length INT DEFAULT 0;
SET in_user_id = getUserId(in_connection_id);
IF in_user_id IS NULL OR in_user_id = "" THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_status_id IS NULL OR in_status_id = "" THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Status id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_title IS NULL OR in_content IS NULL OR in_title = "" OR in_content = "" THEN
SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Content or title is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF NOT EXISTS (SELECT * FROM user WHERE id = in_user_id AND enabled = TRUE) THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User does not exist', MYSQL_ERRNO = 1002;
END IF;
SET @project_id = UUID();
   
INSERT INTO project (id,user_id,status_id,title,content) VALUES (@project_id,in_user_id,in_status_id,in_title,in_content);
   	
SELECT COUNT(*) FROM category WHERE INSTR(in_categories_id,id) AND visible = TRUE INTO length;
WHILE i < length DO
    INSERT INTO project_category (project_id,category_id) VALUES (@project_id,(SELECT id FROM category WHERE INSTR(in_categories_id,id) AND visible = TRUE LIMIT i, 1));
    SET i = i + 1;                             
END WHILE;
SELECT 
p.id 'id',
u.id 'user_id',
u.email 'user_email',
JSON_OBJECT('id',s.id,'name',s.name,'color',s.color) 'status',
JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'name',c.name,'color',c.color)) 'categories',
p.title 'title',
p.content 'content',
p.timestamp 'timestamp'
FROM project p LEFT JOIN project_category pc ON pc.project_id = p.id LEFT JOIN category c ON c.id = pc.category_id
LEFT JOIN status s ON s.id = p.status_id LEFT JOIN user u ON u.id = p.user_id WHERE p.id = @project_id;
END//
-- rollback DROP PROCEDURE `AddProject`;

-- changeset liquibase:get_projects_procedure endDelimiter://
CREATE PROCEDURE `GetProjects`(IN `in_connection_id` VARCHAR(256), IN `in_project_id` VARCHAR(36))
BEGIN
DECLARE in_uid VARCHAR(256);
DECLARE in_offset BIGINT DEFAULT 0;
DECLARE in_role ENUM('admin','user') DEFAULT 'user';
SET in_uid = getUserId(in_connection_id);
IF EXISTS (SELECT * FROM user WHERE in_uid = id)
THEN
	IF EXISTS (SELECT * FROM user WHERE in_uid = id AND enabled = FALSE)
    THEN
    	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User is disabled', MYSQL_ERRNO = 1002;
    END IF;
    IF EXISTS (SELECT * FROM user WHERE in_uid = id AND enabled = TRUE AND role = 'admin')
    THEN
    	SET in_role = 'admin';
    END IF;
ELSE 
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User does not exist', MYSQL_ERRNO = 1003;
END IF;
IF in_project_id IS NOT NULL AND in_project_id != ""
THEN
    WITH all_projects_rows AS (
        SELECT ROW_NUMBER() OVER (ORDER BY timestamp DESC) AS RowNumber, id
        FROM project
    ), selected_project_row AS (
        SELECT RowNumber
        FROM all_projects_rows
        WHERE CASE WHEN in_role = 'user' THEN user_id = in_uid ELSE 1=1 END AND id = in_project_id
    )
    SELECT RowNumber
    INTO in_offset
    FROM selected_project_row;
END IF;
SELECT
    p.id 'id',
    u.id 'user_id',
    u.email 'user_email',
    p.title 'title',
    p.content 'content',
    p.timestamp 'timestamp',
    JSON_OBJECT(
        'id',
        s.id,
        'name',
        s.name,
        'color',
        s.color,
        'visible',
        s.visible
    ) 'status',
        JSON_ARRAYAGG(JSON_OBJECT(
            'id',
            c.id,
            'name',
            c.name,
            'color',
            c.color,
            'visible',
            c.visible
        
    )) 'categories'
FROM
    project p
LEFT JOIN project_category pc ON
    pc.project_id = p.id
LEFT JOIN category c ON
    pc.category_id = c.id
LEFT JOIN status s ON
    p.status_id = s.id 
LEFT JOIN user u ON u.id = p.user_id
WHERE CASE WHEN in_role = 'user' THEN p.user_id = in_uid ELSE 1=1 END GROUP BY p.id ORDER BY p.timestamp DESC LIMIT in_offset,20;
END//
-- rollback DROP PROCEDURE `GetProjects`;