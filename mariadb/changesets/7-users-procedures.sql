--liquibase formatted sql

-- changeset liquibase:create_user_procedure endDelimiter://
CREATE PROCEDURE `CreateUser`(IN `in_uid` VARCHAR(256), IN `in_email` TEXT)
BEGIN
IF in_uid IS NULL OR in_uid = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Uid is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_email IS NULL OR in_email = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Email is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF EXISTS (SELECT * FROM user WHERE email = in_email)
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User of this email already exists', MYSQL_ERRNO = 1002;
END IF; 
INSERT INTO user (id,email) VALUES (in_uid,in_email);
SELECT id, role, email, enabled FROM user WHERE id = in_uid;
END//
-- rollback DROP PROCEDURE `CreateUser`;

-- changeset liquibase:get_all_users_procedure endDelimiter://
CREATE PROCEDURE `GetAllUsers`(IN `in_connection_id` VARCHAR(256), IN `in_user_id` VARCHAR(256))
BEGIN
DECLARE in_admin_id VARCHAR(256);
DECLARE in_offset BIGINT DEFAULT 0;
SET in_admin_id = getUserId(in_connection_id);
IF in_admin_id IS NULL OR in_admin_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Admin id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF EXISTS (SELECT * FROM user WHERE id = in_admin_id AND role = 'admin' AND enabled = TRUE)
THEN
	IF in_user_id IS NOT NULL AND in_user_id != ""
    THEN
        WITH all_users_rows AS (
            SELECT ROW_NUMBER() OVER (ORDER BY timestamp DESC) AS RowNumber, id
            FROM user
        ), selected_user_row AS (
            SELECT RowNumber
            FROM all_users_rows
            WHERE id = in_user_id
        )
        SELECT RowNumber
        INTO in_offset
        FROM selected_user_row;
    END IF;
    SELECT id, email, role, enabled FROM user ORDER BY timestamp DESC LIMIT in_offset,20;
ELSE
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
END IF;
END//
-- rollback DROP PROCEDURE `GetAllUsers`;

-- changeset liquibase:get_user_procedure endDelimiter://
CREATE PROCEDURE `GetUser`(IN `in_uid` VARCHAR(256))
BEGIN
IF in_uid IS NULL OR in_uid = "" THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User id is null or empty', MYSQL_ERRNO = 1001;
END IF;
SELECT id, role, email, enabled FROM user WHERE id = in_uid;
END//
-- rollback DROP PROCEDURE `GetUser`;