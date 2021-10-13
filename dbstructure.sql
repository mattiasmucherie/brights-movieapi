DROP TABLE IF EXISTS movieCategories;
CREATE TABLE movieCategories (
  id INTEGER PRIMARY KEY NOT NULL,
  category char(32) NOT NULL
);

INSERT INTO movieCategories (category) VALUES ('Comedy'), ('Action'), ('Thriller'), ('Adventure'), ('Drama');

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  movieId INTEGER PRIMARY KEY NOT NULL,
  movieName char(64) NOT NULL,
  plot TEXT,
  categoryId INTEGER,
  year INTEGER NOT NULL,
  FOREIGN KEY (categoryId) 
    REFERENCES movieCategories(id)
);  

INSERT INTO movies (movieName, plot, categoryId, year) VALUES 
  ('Lord of the rings', 'Four hobbits take a walk', 4, strftime('%Y-%m-%d', '2001-01-01')),
  ('The two towers', 'Two hobbits continue to walk', 4, strftime('%Y-%m-%d', '2002-01-01')),
  ('The return of the king', 'Two hobbits finally gets there', 4, strftime('%Y-%m-%d', '2003-01-01')),
  ('Batman begins', 'A rich man in black mask chases bad guys', 2, strftime('%Y-%m-%d', '2005-01-01')),
  ('Batman begins', 'The Joker and Batman are having a good time', 2, strftime('%Y-%m-%d', '2008-01-01'));
