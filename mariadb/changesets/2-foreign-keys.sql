--liquibase formatted sql

-- changeset liquibase:add_foreign_key_user_id_to_project
ALTER TABLE `project` ADD CONSTRAINT `fk__project__user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
-- rollback ALTER TABLE project DROP FOREIGN KEY `fk__project__user_id`;

-- changeset liquibase:add_foreign_key_status_id_to_project
ALTER TABLE `project` ADD CONSTRAINT `fk__project__status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
-- rollback ALTER TABLE project DROP FOREIGN KEY `fk__project__status_id`;

-- changeset liquibase:add_foreign_key_category_id_to_project_category
ALTER TABLE `project_category` ADD CONSTRAINT `fk__project_category__category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
-- rollback ALTER TABLE project_category DROP FOREIGN KEY `fk__project_category__category_id`;

-- changeset liquibase:add_foreign_key_project_id_to_project_category
ALTER TABLE `project_category` ADD CONSTRAINT `fk__project_category__project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);
-- rollback ALTER TABLE project_category DROP FOREIGN KEY `fk__project_category__project_id`;