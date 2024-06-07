--liquibase formatted sql

-- changeset liquibase:add_category_procedure endDelimiter://
CREATE PROCEDURE `AddCategory`(IN `in_connection_id` VARCHAR(256), IN `in_name` TINYTEXT CHARACTER SET utf8mb4, IN `in_color` VARCHAR(7))
BEGIN
IF in_name IS NULL or in_name = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Name is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_color IS NULL
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Color is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF EXISTS (SELECT * FROM category WHERE name = in_name AND visible = TRUE)
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Category of that name already exists', MYSQL_ERRNO = 1002;
END IF;
IF NOT EXISTS (SELECT * FROM user WHERE id = getUserId(in_connection_id) AND role = 'admin' AND enabled = TRUE)
	THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
END IF;
IF EXISTS (SELECT * FROM category WHERE name = in_name AND visible = FALSE)
THEN
	UPDATE category SET visible = TRUE, color = in_color WHERE name = in_name;
    SELECT id, name, color, visible FROM category WHERE name = in_name;
ELSE
	SET @id = UUID();
	INSERT INTO category (id,name,color) VALUES (@id,in_name,in_color);
	SELECT id, name, color, visible FROM category WHERE id = @id;
END IF;
END//
-- rollback DROP PROCEDURE `AddCategory`;

-- changeset liquibase:get_categories_procedure endDelimiter://
CREATE PROCEDURE `GetCategories`(IN `in_connection_id` VARCHAR(256))
BEGIN
DECLARE in_uid VARCHAR(256);
DECLARE in_role ENUM('admin','user') DEFAULT 'user';
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
 IF EXISTS (SELECT * FROM user WHERE in_uid = id AND enabled = TRUE AND role = 'admin')
    THEN
    	SET in_role = 'admin';
    END IF;
SELECT id, name, color, visible FROM category WHERE (CASE WHEN in_role = "user" THEN visible = TRUE ELSE 1=1 END);
END//
-- rollback DROP PROCEDURE `GetCategories`;

-- changeset liquibase:remove_category_procedure endDelimiter://
CREATE PROCEDURE `RemoveCategory`(IN `in_connection_id` VARCHAR(256), IN `in_category_id` VARCHAR(36))
BEGIN
IF in_connection_id IS NULL OR in_connection_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Connection id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF in_category_id IS NULL OR in_category_id = ""
THEN
	SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Category id is null or empty', MYSQL_ERRNO = 1001;
END IF;
IF NOT EXISTS (SELECT * FROM user WHERE id = getUserId(in_connection_id) AND role = 'admin' AND enabled = TRUE)
	THEN
    SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Id provided does not have sufficient permissions', MYSQL_ERRNO = 1002;
END IF;
UPDATE category SET visible = FALSE WHERE id = in_category_id;
SELECT id, name, color, visible FROM category WHERE id = in_category_id;
END//
-- rollback DROP PROCEDURE `RemoveCategory`;