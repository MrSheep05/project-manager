--liquibase formatted sql

-- changeset liquibase:add_connection_procedure endDelimiter://
CREATE PROCEDURE `AddConnection`(IN `in_uid` VARCHAR(256), IN `in_connection_id` VARCHAR(256))
BEGIN
IF in_uid IS NULL OR in_uid = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Uid is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_connection_id IS NULL OR in_connection_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Connection id is null or empty', MYSQL_ERRNO = 1001;
END IF;
INSERT INTO connections (user_id,connection_id) VALUES (in_uid,in_connection_id);
END//
-- rollback DROP PROCEDURE `AddConnection`;

-- changeset liquibase:get_connection_procedure endDelimiter://
CREATE PROCEDURE `GetConnection`(IN `in_uid` VARCHAR(256), IN `in_user_role` ENUM('user','admin'))
BEGIN
IF in_uid IS NULL OR in_uid = "" THEN
	IF in_user_role IS NULL THEN
		SELECT JSON_ARRAYAGG(JSON_OBJECT("user_id",user_id,"connection_id",connection_id)) AllConnections FROM connections;
    ELSE
    	SELECT JSON_ARRAYAGG(JSON_OBJECT("user_id",c.user_id,"connection_id",c.connection_id)) AllConnections FROM connections c JOIN user u ON u.id = c.user_id WHERE role = in_user_role;
    END IF;
ELSE
	
	SELECT JSON_ARRAYAGG(JSON_OBJECT("user_id",user_id,"connection_id",connection_id)) AllConnections FROM connections WHERE in_uid = user_id;
END IF;
END//
-- rollback DROP PROCEDURE `GetConnection`;

-- changeset liquibase:remove_connection_procedure endDelimiter://
CREATE PROCEDURE `RemoveConnection`(IN `in_connection_id` VARCHAR(256))
BEGIN
IF in_connection_id IS NULL
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Connection id is null or empty', MYSQL_ERRNO = 1001;
END IF;
DELETE FROM connections WHERE connection_id = in_connection_id;
END//
-- rollback DROP PROCEDURE `RemoveConnection`;