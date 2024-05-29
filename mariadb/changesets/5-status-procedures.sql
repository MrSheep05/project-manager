--liquibase formatted sql

-- changeset liquibase:add_status_procedure endDelimiter://
CREATE PROCEDURE `AddStatus`(IN `in_name` TINYTEXT, IN `in_color` VARCHAR(7), IN `in_connection_id` VARCHAR(256))
BEGIN
DECLARE in_admin_id VARCHAR(256);
SET in_admin_id = getUserId(in_connection_id);
IF in_name IS NULL OR in_name = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Name is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_color IS NULL
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Color is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF EXISTS (SELECT * FROM status WHERE name = in_name AND visible = TRUE)
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Status of that name already exists', MYSQL_ERRNO = 1002;
END IF;
IF NOT EXISTS (SELECT * FROM user WHERE id = in_admin_id AND role = 'admin' AND enabled = TRUE)
	THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
END IF;
IF EXISTS (SELECT * FROM status WHERE name = in_name AND visible = FALSE)
THEN
	UPDATE status SET visible = TRUE, color = in_color WHERE name = in_name AND visible = FALSE;
    SELECT JSON_OBJECT('id',id,'name',name,'color',color,'visible',visible) CreatedStatus FROM status WHERE name = in_name AND visible = TRUE;
ELSE
	SET @id = UUID();
	INSERT INTO status (id,name,color) VALUES (@id,in_name,in_color);
	SELECT JSON_OBJECT('id',id,'name',name,'color',color,'visible',visible) CreatedStatus FROM status WHERE id = @id;
END IF;
END//
-- rollback DROP PROCEDURE `AddStatus`;

-- changeset liquibase:get_status_procedure endDelimiter://
CREATE PROCEDURE `GetStatus`(IN `in_connection_id` VARCHAR(256))
BEGIN
DECLARE in_uid VARCHAR(256);
SET in_uid = getUserId(in_connection_id);
IF EXISTS (SELECT * FROM user WHERE in_uid = id)
THEN
	IF EXISTS (SELECT * FROM user WHERE in_uid = id AND enabled = FALSE)
    THEN
    	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User is disabled', MYSQL_ERRNO = 1002;
    END IF;
ELSE 
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User does not exist', MYSQL_ERRNO = 1003;
END IF;
SELECT 
(CASE
WHEN u.role = 'admin' THEN 
	(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',id,'name',name,'color',color,'visible',visible)) AllStatuses FROM status)
WHEN u.role = 'user' THEN
	(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',id,'name',name,'color',color)) AllStatuses FROM status WHERE visible = TRUE)
ELSE
 	(SELECT NULL)
END) StatusResult
FROM user u WHERE id = in_uid;
END//
-- rollback DROP PROCEDURE `GetStatus`;

-- changeset liquibase:remove_status_procedure endDelimiter://
CREATE PROCEDURE `RemoveStatus`(IN `in_connection_id` VARCHAR(256), IN `in_status_id` VARCHAR(36))
BEGIN
IF in_connection_id IS NULL OR in_connection_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Connection id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_status_id IS NULL OR in_status_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Status id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF NOT EXISTS (SELECT * FROM user WHERE id = getUserId(in_connection_id) AND role = 'admin' AND enabled = TRUE)
	THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO  = 1002;
END IF;
UPDATE status SET visible = FALSE WHERE id = in_status_id;
SELECT JSON_OBJECT('id',id,'name',name,'color',color,'visible',visible) RemovedStatus FROM status WHERE id = in_status_id;
END//
-- rollback DROP PROCEDURE `RemoveStatus`;
