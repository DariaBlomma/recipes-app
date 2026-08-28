-- liquibase formatted sql

-- changeset daria:008-add-category-name-unique-constraint
CREATE UNIQUE INDEX IF NOT EXISTS idx_category_name_unique
ON categories(name)
WHERE deleted_at IS NULL;

-- rollback DROP INDEX IF EXISTS idx_category_name_unique;