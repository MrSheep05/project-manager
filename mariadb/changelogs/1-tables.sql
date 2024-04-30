--liquibase formatted sql

-- changeset liquibase:create_user_table
CREATE TABLE zset_uwachowski.user (
  `id` VARCHAR(256) UNIQUE PRIMARY KEY NOT NULL,
  `role` ENUM('admin','user') NOT NULL DEFAULT 'user',
  `email` TEXT NOT NULL,
  `enabled` BOOLEAN NOT NULL DEFAULT 0,
  `timestamp` BIGINT(20) NOT NULL DEFAULT ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000,0)
);
-- rollback DROP TABLE zset_uwachowski.user;

-- changeset liquibase:create_project_table
CREATE TABLE zset_uwachowski.project (
  `id` VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(256) NOT NULL,
  `status_id` VARCHAR(36) NOT NULL,
  `title` TINYTEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `timestamp` BIGINT(20) NOT NULL DEFAULT ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000,0)
);
-- rollback DROP TABLE zset_uwachowski.project;

-- changeset liquibase:create_connections_table
CREATE TABLE zset_uwachowski.connections (
  `connection_id` VARCHAR(256) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(256) NOT NULL
);
-- rollback DROP TABLE zset_uwachowski.connections;

-- changeset liquibase:create_category_table
CREATE TABLE zset_uwachowski.category (
  `id` VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  `name` TINYTEXT NOT NULL,
  `color` MEDIUMINT(8) UNSIGNED NOT NULL,
  `visible` BOOLEAN NOT NULL
);
-- rollback DROP TABLE zset_uwachowski.category;

-- changeset liquibase:create_project_category_table
CREATE TABLE zset_uwachowski.project_category (
 `project_id` VARCHAR(36) NOT NULL,
 `category_id` VARCHAR(36) NOT NULL
);
-- rollback DROP TABLE zset_uwachowski.project_category;

-- changeset liquibase:status_table
CREATE TABLE zset_uwachowski.status (
  `id` VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL,
  `name` TINYTEXT NOT NULL,
  `color` MEDIUMINT(8) UNSIGNED NOT NULL,
  `visible` BOOLEAN NOT NULL
);
-- rollback DROP TABLE zset_uwachowski.status;