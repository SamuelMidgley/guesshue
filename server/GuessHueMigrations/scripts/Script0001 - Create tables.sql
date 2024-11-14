CREATE TABLE IF NOT EXISTS users
(
    id            SERIAL PRIMARY KEY,
    username      VARCHAR NOT NULL,
    email         VARCHAR NOT NULL,
    password_hash BYTEA   NOT NULL,
    password_salt BYTEA   NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP
)