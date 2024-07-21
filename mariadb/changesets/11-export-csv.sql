--liquibase formatted sql

-- changeset liquibase:get_csv_procedure endDelimiter://
CREATE PROCEDURE `CsvProjects`(IN `in_connection_id` VARCHAR(256), IN `in_users_id` TEXT)
BEGIN
DECLARE in_uid VARCHAR(256);
DECLARE in_role ENUM('admin','user') DEFAULT 'user';
SET in_uid = getUserId(in_connection_id);
IF EXISTS (SELECT * FROM user WHERE id = in_uid)
THEN
	IF EXISTS (SELECT * FROM user WHERE id = in_uid AND enabled = FALSE)
    THEN
    	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User is disabled', MYSQL_ERRNO = 1002;
    END IF;
    IF EXISTS (SELECT * FROM user WHERE id = in_uid AND enabled = TRUE AND role = 'admin')
    THEN
    	SET in_role = 'admin';
    ELSE
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
    END IF;
ELSE 
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User does not exist', MYSQL_ERRNO = 1003;
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
WHERE INSTR(in_users_id,u.id) GROUP BY p.id ORDER BY u.id, p.timestamp;
END//
-- rollback DROP PROCEDURE `CsvProjects`;