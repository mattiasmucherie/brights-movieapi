const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

const openDb = async () => {
  return await open({
    filename: "movies.db",
    driver: sqlite3.Database,
  });
};

const getMovies = async () => {
  const dbCon = await openDb();
  const query = "SELECT movieId, movieName, plot, categoryId, category, year FROM MOVIES INNER JOIN movieCategories ON movieCategories.id=movies.categoryId ORDER BY movieName ASC";
  const result = await dbCon.all(query);
  return result;
};
const searchMovie = async (search) => {
  const dbCon = await openDb();
  const query = "SELECT movieId, movieName, plot, categoryId, category, year FROM MOVIES INNER JOIN movieCategories ON movieCategories.id=movies.categoryId WHERE movieName LIKE ? ORDER BY movieName ASC";
  const result = await dbCon.all(query, [`%${search}%`]);
  return result;
};

const getMovie = async (id) => {
  const dbCon = await openDb();
  const query = "SELECT movieId, movieName, plot, categoryId, category, year FROM MOVIES INNER JOIN movieCategories ON movieCategories.id=movies.categoryId WHERE movieId=?";
  const result = await dbCon.get(query, [id]);
  return result;
};

const addMovie = async (info) => {
  const dbCon = await openDb();
  const query = "INSERT INTO movies (movieName, plot, categoryId, year) VALUES (?, ?, ?, strftime('%Y-%m-%d', ?))";
  const result = await dbCon.run(query, [info.movieName, info.plot, info.categoryId, info.year]);
  if (result.changes > 0) {
    return true;
  }
  return false;
};

const getCategories = async () => {
  const dbCon = await openDb();
  const query = "SELECT category, id FROM movieCategories ORDER BY category ASC";
  return await dbCon.all(query);
};

const deleteMovie = async (id) => {
  const dbCon = await openDb();
  const query = "DELETE FROM movies WHERE movieId=?";
  const result = await dbCon.run(query, [id]);
  if (result.changes > 0) {
    return true;
  }
  return false;
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  getCategories,
  searchMovie,
};
