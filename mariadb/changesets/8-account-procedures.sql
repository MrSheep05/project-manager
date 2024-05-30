--liquibase formatted sql

-- changeset liquibase:enable_account_procedure endDelimiter://
CREATE PROCEDURE `EnableAccount`(IN `in_connection_id` VARCHAR(256), IN `in_user_id` VARCHAR(256))
BEGIN
DECLARE in_admin_id VARCHAR(256);
SET in_admin_id = getUserId(in_connection_id);
IF in_admin_id IS NULL OR in_admin_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Admin id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_user_id IS NULL OR in_user_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF EXISTS (SELECT * FROM user WHERE id = in_admin_id AND role = 'admin' AND enabled = TRUE)
THEN
	UPDATE user SET enabled = TRUE WHERE id = in_user_id AND role = 'user';
   SELECT id, email, role, enabled FROM user WHERE id = in_user_id;
ELSE
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
END IF;
END//
-- rollback DROP PROCEDURE `EnableAccount`;

-- changeset liquibase:disable_account_procedure endDelimiter://
CREATE PROCEDURE `DisableAccount`(IN `in_connection_id` VARCHAR(256), IN `in_user_id` VARCHAR(256))
BEGIN
DECLARE in_admin_id VARCHAR(256);
SET in_admin_id = getUserId(in_connection_id);
IF in_admin_id IS NULL OR in_admin_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Admin id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_user_id IS NULL OR in_user_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'User id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF EXISTS (SELECT * FROM user WHERE id = in_admin_id AND role = 'admin' AND enabled = TRUE)
THEN
	UPDATE user SET enabled = FALSE WHERE id = in_user_id AND role = 'user';
    SELECT id, email, role, enabled FROM user WHERE id = in_user_id;
ELSE
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
END IF;
END//
-- rollback DROP PROCEDURE `DisableAccount`;