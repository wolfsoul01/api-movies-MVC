import { Router } from "express";
import { patchMovie, validateMovie } from "../schema/movieZod.js";
import {randomUUID} from "node:crypto";
import {MovieModel} from '../models/movies.js'
export const moviesRoutes = Router();


moviesRoutes.get("/", (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  const { genere } = req.query;

  const movies  = MovieModel.getAll(genere)

  res.json(movies)

  
});

moviesRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  
   const movie = MovieModel.getByID(id)

  res.json(movie);
});

moviesRoutes.post("/", (req, res) => {
  const validate = validateMovie(req.body);

  if (!validate.success) res.send(validate.error);

  const newMovie = {
    id: randomUUID(),
    ...validate.data,
  };

 MovieModel.createMovie(newMovie)

  res.status(201).send(newMovie);
});

moviesRoutes.patch("/:id", (req, res) => {
  const result = patchMovie(req.body);

  if (!result.success) res.json({ error: result.error });

  const { id } = req.params;
  
  const movieIndex = MovieModel.getIndex(id)

  if (movieIndex === -1) res.json({ message: "Movie not Found" });

  const movieUpdate = {
    ...MovieModel.getByID(id),
    ...result.data,
  };

  const update = MovieModel.updateMovie(movieIndex,movieUpdate)

  res.json(update);
});

moviesRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) res.json({ message: "Movie not Found" });

  movies.splice(movieIndex, 1);

  res.json({ message: "Movie delte" });
});
