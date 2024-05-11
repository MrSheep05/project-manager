--liquibase formatted sql

-- changeset liquibase:initial_status_data
INSERT INTO `status`(`name`, `color`) VALUES ('Zrobione',3908732), ('Do zrobienia',7962259), ('W trakcie',7974909);
-- rollback DELETE FROM `status` WHERE name IN ('Zrobione','Do zrobienia','W trakcie');

-- changeset liquibase:initial_category_data
INSERT INTO `category`(`name`,`color`) VALUES ('Konkurs',7757231), ('Kółko',16624445), ('Wycieczka',10277670);
-- rollback DELETE FROM `category` WHERE name IN ('Konkurs','Kółko','Wycieczka');
