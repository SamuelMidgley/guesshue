CREATE TABLE IF NOT EXISTS users
(
    id            SERIAL PRIMARY KEY,
    username      VARCHAR NOT NULL,
    email         VARCHAR NOT NULL,
    password_hash BYTEA   NOT NULL,
    password_salt BYTEA   NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game
(
    id            SERIAL PRIMARY KEY,
    correct_color VARCHAR NOT NULL,
    user_id       INT     NOT NULL,
    option_one    VARCHAR NOT NULL,
    option_two    VARCHAR NOT NULL,
    option_three  VARCHAR NOT NULL,
    CONSTRAINT fk_game_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS guess
(
    id          SERIAL PRIMARY KEY,
    user_id     INT     NOT NULL,
    game_id     INT     NOT NULL,
    color_guess VARCHAR NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (game_id, user_id),
    CONSTRAINT fk_guess_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_guess_game FOREIGN KEY (game_id) REFERENCES game (id)
);