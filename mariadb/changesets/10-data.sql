--liquibase formatted sql

-- changeset liquibase:initial_status_data
INSERT INTO `status`(`name`, `color`) VALUES ('Zrobione','#3BA47C'), ('Do zrobienia','#C26410'), ('W trakcie','#79AFFD'), ('Problem','#800000');
-- rollback DELETE FROM `status` WHERE name IN ('Zrobione','Do zrobienia','W trakcie','Problem');

-- changeset liquibase:initial_category_data
INSERT INTO `category`(`name`,`color`) VALUES ('Konkurs','#765DAF'), ('Kółko','#FDAB3D'), ('Wycieczka','#9CD326');
-- rollback DELETE FROM `category` WHERE name IN ('Konkurs','Kółko','Wycieczka');
