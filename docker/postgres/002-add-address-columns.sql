ALTER TABLE address
    ADD COLUMN IF NOT EXISTS number integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS complement character varying(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS neighborhood character varying(255) NOT NULL DEFAULT '';

ALTER TABLE address
    ALTER COLUMN number DROP DEFAULT,
    ALTER COLUMN complement DROP DEFAULT,
    ALTER COLUMN neighborhood DROP DEFAULT;
