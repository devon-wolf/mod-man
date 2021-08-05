-- parent folder (/sql) needs to be on the same directory level as /src and /dist in order to be accessible --
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS mods CASCADE;
DROP TABLE IF EXISTS user_mods;

CREATE TABLE users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email VARCHAR(256) NOT NULL,
	hash VARCHAR(512) NOT NULL
);

-- updates when a user adds a mod to their collection; first insert query of the batch --
CREATE TABLE games (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name TEXT NOT NULL,
	domain_name TEXT NOT NULL,
	db_game_id INTEGER NOT NULL
);

-- updates when a user adds a mod to their collection; this query runs before the user_mods query --
CREATE TABLE mods (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name TEXT NOT NULL,
	summary TEXT NOT NULL,
	db_uid BIGINT NOT NULL,
	db_mod_id INTEGER NOT NULL,
	db_game_id INTEGER NOT NULL,
	domain_name TEXT NOT NULL,
	version TEXT NOT NULL,	
	author TEXT NOT NULL,
	dependencies TEXT[],
	updated_timestamp INTEGER NOT NULL,
	game_id BIGINT NOT NULL REFERENCES games(id)
);

-- junction --
-- row added when a user adds a mod to their collection, updated when user initiates a new download --
CREATE TABLE user_mods (
	"user_id" BIGINT REFERENCES users(id),
	mod_id BIGINT REFERENCES mods(id),
	last_download TEXT NOT NULL
);