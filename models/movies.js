import { redJson } from "../utils/redFileJson.js";
import { randomUUID } from "node:crypto";

const movies = redJson("../movies.json") || [];

export class MovieModel {
  static async getAll({ options }) {
    
    if (options) {
      const moviesFilter = movies.filter((movie) =>
        movie.genre.map((g) => g.toLowerCase()).includes(options.genre.toLowerCase())
      );

      return moviesFilter;
    }

    return movies;
  }

  static async getByID({ id }) {
    const movie = movies.find((movie) => movie.id == id);

    if (movie === -1) return false;

    return movie;
  }
  static async createMovie({ validate }) {
    const newMovie = {
      id: randomUUID(),
      ...validate.data,
    };

    movies.push(newMovie);
    return newMovie;
  }

  static async updateMovie({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    const updateMovie = {
      ...movies[movieIndex],
      ...input,
    };

    movies[movieIndex] = updateMovie;
    return movies[movieIndex];
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }
}
