import { redJson } from "../utils/redFileJson.js";

const movies = redJson("../movies.json");

export class MovieModel {
  static getAll(options) {
    if (options) {
      const moviesFilter = movies.filter((movie) =>
        movie.genre.map((g) => g.toLowerCase()).includes(options.toLowerCase())
      );
      return moviesFilter;
    }

    return movies;
  }

  static getByID(id){
    const movie = movies.find((movie) => movie.id == id);
    return movie

    
  }
  static createMovie(newMovie){

    movies.push(newMovie);

  }
  static getIndex(id){

    const movieIndex = movies.findIndex((movie) => movie.id === id);

    return movieIndex
  }
  static updateMovie(index,movieUpdate){

    movies[index] = movieUpdate;
    return movies[index]
  }
}
