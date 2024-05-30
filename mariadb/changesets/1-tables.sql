--liquibase formatted sql

-- changeset liquibase:create_user_table
CREATE TABLE user (
  `id` VARCHAR(256) UNIQUE PRIMARY KEY NOT NULL,
  `role` ENUM('admin','user') NOT NULL DEFAULT 'user',
  `email` TEXT NOT NULL,
  `enabled` BOOLEAN NOT NULL DEFAULT 0,
  `timestamp` BIGINT(20) NOT NULL DEFAULT ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000,0)
);
-- rollback DROP TABLE user;

-- changeset liquibase:create_project_table
CREATE TABLE project (
  `id` VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL DEFAULT UUID(),
  `user_id` VARCHAR(256) NOT NULL,
  `status_id` VARCHAR(36) NOT NULL,
  `title` TINYTEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `timestamp` BIGINT(20) NOT NULL DEFAULT ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000,0)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
-- rollback DROP TABLE project;

-- changeset liquibase:create_connections_table
CREATE TABLE connections (
  `connection_id` VARCHAR(256) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(256) NOT NULL
);
-- rollback DROP TABLE connections;

-- changeset liquibase:create_category_table
CREATE TABLE category (
  `id` VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL DEFAULT UUID(),
  `name` TINYTEXT NOT NULL,
  `color` VARCHAR(7) NOT NULL,
  `visible` BOOLEAN NOT NULL DEFAULT 1,
  CHECK (color REGEXP '^#([A-Fa-f0-9]{6})$')
);
-- rollback DROP TABLE category;

-- changeset liquibase:create_project_category_table
CREATE TABLE project_category (
 `project_id` VARCHAR(36) NOT NULL,
 `category_id` VARCHAR(36) NOT NULL
);
-- rollback DROP TABLE project_category;

-- changeset liquibase:status_table
CREATE TABLE status (
  `id` VARCHAR(36) UNIQUE PRIMARY KEY NOT NULL DEFAULT UUID(),
  `name` TINYTEXT NOT NULL,
  `color` VARCHAR(7) NOT NULL,
  `visible` BOOLEAN NOT NULL DEFAULT 1
  CHECK (color REGEXP '^#([A-Fa-f0-9]{6})$')
);
-- rollback DROP TABLE status;