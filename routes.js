const routes = require("express").Router();
const db = require("./database");

/**
 * Get all movies, if querystring s is provied it will return
 * all movies that have a matching movieName s
 *
 * @returns an array with movies
 */

routes.get("/", async (req, res) => {
  try {
    if (req.query.s) {
      const movies = await db.searchMovie(req.query.s);
      res.send(movies);
    } else {
      const movies = await db.getMovies();
      res.send(movies);
    }
  } catch (error) {
    res.status(500).json({status: "nok"});
  }
});
/**
 * Get categories
 *
 * @returns an array with information about categories
 */
routes.get("/categories", async (req, res) => {
  try {
    const cats = await db.getCategories();
    res.send(cats);
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});
/**
 * Get a movie
 *
 * @param id The id of the movie you want to fetch
 *
 * @returns An object with movie information
 */
routes.get("/:id", async (req, res) => {
  try {
    const movie = await db.getMovie(req.params.id);
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send({status: "nok", msg: `A movie with id ${req.params.id} could not be found,.`});
    }
  } catch (error) {
    res.sendStatus(500).json({status: "nok", msg: `Its not you, its me...`});
  }
});

/**
 * Add a movie
 *
 * @param req.body Information about a movie to add
 * {
 *  "movieName" : "Name of movie",
 *  "plot" : "The plot of the movie",
 *  "year" : "The year the movie was released",
 *  "categoryId" : "The category id for the movie"
 * }
 *
 * @returns json result with information about the operation
 */
routes.post("/", async (req, res) => {
  try {
    if (req.body.movieName && req.body.plot && req.body.categoryId && req.body.year) {
      const result = await db.addMovie(req.body);
      if (result) {
        res.send({status: "ok"});
      } else {
        res.send(400).send({status: "nok", msg: "Could not add movie"});
      }
    } else {
      res.status(400).send({status: "nok", msg: "Missing parameters for adding movie"});
    }
  } catch (error) {
    res.status(500).send({status: "nok", msg: "Could not add movie"});
  }
});

/**
 * Delete a movie by id
 *
 * @param id The id of the movie to delete
 *
 * @returns json result with information about the operation
 */
routes.delete("/:id", async (req, res) => {
  try {
    const result = await db.deleteMovie(req.params.id);
    if (result) {
      res.send({status: "ok", msg: `Movie with id ${id} was deleted.`});
    } else {
      res.send({status: "nok", msg: `Movie with id ${id} could not be deleted`});
    }
  } catch (error) {
    res.status(500).json({status: "nok"});
  }
});
module.exports = routes;
