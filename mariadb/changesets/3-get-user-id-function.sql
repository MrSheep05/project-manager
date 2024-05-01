--liquibase formatted sql

-- changeset liquibase:get_user_id endDelimiter://
CREATE FUNCTION `getUserId`(`in_id` VARCHAR(256)) 
BEGIN 
DECLARE out_user_id VARCHAR(256); 
SELECT user_id INTO out_user_id FROM connections WHERE connection_id = in_id LIMIT 1; 
RETURN out_user_id; 
END//

-- rollback DROP FUNCTION `getUserId`;