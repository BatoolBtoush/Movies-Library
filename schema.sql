DROP TABLE IF EXISTS batFavMovies;

CREATE TABLE IF NOT EXISTS batFavMovies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date INTEGER,
    poster_path VARCHAR(10000),
    overview VARCHAR(10000),
    comment VARCHAR(255)
);