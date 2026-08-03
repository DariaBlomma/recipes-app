-- liquibase formatted sql

-- changeset daria:007-make-optional-category-user-connection
ALTER TABLE categories ALTER COLUMN user_id DROP NOT NULL ;

-- rollback ALTER TABLE categories ALTER COLUMN user_id SET NOT NULL;

-- changeset daria:007-create-recipe-personal-categories
CREATE TABLE recipe_personal_categories (
    recipe_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (recipe_id, category_id),
    CONSTRAINT fk_rpc_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    CONSTRAINT fk_rpc_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- rollback DROP TABLE recipe_personal_categories;