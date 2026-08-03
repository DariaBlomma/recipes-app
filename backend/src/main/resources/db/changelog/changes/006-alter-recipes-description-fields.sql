-- liquibase formatted sql

-- changeset daria:006-alter-recipes-description-column
ALTER TABLE recipes ALTER COLUMN description SET NOT NULL;

-- rollback ALTER TABLE recipes ALTER COLUMN description DROP NOT NULL;


-- changeset daria:006-add-recipes-short-description-column
ALTER TABLE recipes ADD COLUMN short_description VARCHAR(2000);

-- rollback ALTER TABLE recipes DROP COLUMN short_description;