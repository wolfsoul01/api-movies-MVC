import { Router } from "express";
import { patchMovie, validateMovie } from "../schema/movieZod.js";
import { MovieModel } from "../models/movies.js";
export const moviesRoutes = Router();

moviesRoutes.get("/", (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  const { genere } = req.query;

  const movies = MovieModel.getAll({genere});

  res.json(movies);
});

moviesRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = MovieModel.getByID({id});

  if(!movie) res.json({message:'Movie not Found '})


  res.json(movie);
});

moviesRoutes.post("/", (req, res) => {
  const validate = validateMovie(req.body);

  if (!validate.success) res.send(validate.error);

  const newMovie = MovieModel.createMovie({ validate });

  res.status(201).send(newMovie);
});

moviesRoutes.patch("/:id", (req, res) => {
  const result = patchMovie(req.body);
  const { id } = req.params;

  if (!result.success) res.json({ error: result.error });

  const updateMovie = MovieModel.updateMovie({ id, input: result.data });

  if (!updateMovie) res.json({ message: "Movie not Found" });

  res.json(updateMovie);
});

moviesRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  const succes = MovieModel.delete({ id });

  if (!succes) {
    res.json({ message: "Movie not found " });;
  }

  res.json({ message: "Movie delte" });
});
