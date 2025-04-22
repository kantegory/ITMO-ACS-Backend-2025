CREATE TABLE users (
   id                SERIAL PRIMARY KEY,
   nickname          VARCHAR(50)  NOT NULL UNIQUE,
   email             VARCHAR(100) NOT NULL UNIQUE,
   password_hash     VARCHAR(255) NOT NULL,
   google_2fa_secret VARCHAR(32),
   is_2fa_enabled    BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE friendships (
   user_id1   INT NOT NULL,
   user_id2   INT NOT NULL,
   status     VARCHAR(10) NOT NULL DEFAULT 'pending',
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   PRIMARY KEY (user_id1, user_id2),
   FOREIGN KEY (user_id1) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (user_id2) REFERENCES users(id) ON DELETE CASCADE,
   CHECK (user_id1 <> user_id2),
   CHECK (user_id1 < user_id2)
);


CREATE TABLE movies (
   movie_id     INT PRIMARY KEY,
   title        VARCHAR(255) NOT NULL,
   description  TEXT,
   poster_url   VARCHAR(255),
   duration     INT,
   release_date DATE
);


CREATE TABLE movie_matches (
   user_id1   INT NOT NULL,
   user_id2   INT NOT NULL,
   movie_id   INT NOT NULL,
   matched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   PRIMARY KEY (user_id1, user_id2, movie_id),
   FOREIGN KEY (user_id1) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (user_id2) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
   CHECK (user_id1 <> user_id2),
   CHECK (user_id1 < user_id2)
);
