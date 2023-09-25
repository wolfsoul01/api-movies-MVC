import { MovieModel } from "../models/movies.js";
import { patchMovie, validateMovie } from "../schema/movieZod.js";

export class MoviesControllers {
  static async getAll(req, res) {
    // res.header({ "Access-Control-Allow-Origin": "*" });

    const { genre } = req.query;

    const movies = await MovieModel.getAll({ options: genre });

    res.json(movies);
  }

  static async getByID(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getByID({ id });

    if (!movie) res.json({ message: "Movie not Found " });

    res.json(movie);
  }

  static async create(req, res) {
    const validate = validateMovie(req.body);

    if (!validate.success) res.send(validate.error);

    const newMovie = await MovieModel.createMovie({ validate });

    res.status(201).send(newMovie);
  }

  static async update(req, res) {
    const result = patchMovie(req.body);
    const { id } = req.params;

    if (!result.success) res.json({ error: result.error });

    const updateMovie = await MovieModel.updateMovie({
      id,
      input: result.data,
    });

    if (!updateMovie) res.json({ message: "Movie not Found" });

    res.json(updateMovie);
  }
  static async delete(req, res) {
    const { id } = req.params;

    const succes = await MovieModel.delete({ id });

    if (!succes) {
      res.json({ message: "Movie not found " });
    }

    res.json({ message: "Movie delte" });
  }
}
