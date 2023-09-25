import z from "zod";

const modelMovie = z.object({
  title:z.string(),
  year:z.number().int().min(1800).max(2024),
  director:z.string(),
  duration:z.number().min(0),
  poster:z.string().url().optional(),
  genere:z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'])),
  rate:z.number().default(0)

});

export function validateMovie(object) {
  return modelMovie.safeParse(object);
}

export function patchMovie(object) {
  return modelMovie.partial().safeParse(object);
}