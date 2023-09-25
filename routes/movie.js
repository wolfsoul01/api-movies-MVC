import { Router } from "express";

import { MoviesControllers } from "../controllers/movie.js";
export const moviesRoutes = Router();

moviesRoutes.get("/", MoviesControllers.getAll);

moviesRoutes.get("/:id", MoviesControllers.getByID );

moviesRoutes.post("/", MoviesControllers.create );

moviesRoutes.patch("/:id", MoviesControllers.update);

moviesRoutes.delete("/:id", MoviesControllers.delete );
