// import movies from "./movies.json" assert { type: "json" };
import express from "express";
import {moviesRoutes} from '../routes/movie.js'

const app = express();
app.disable("x-powered-by");
app.use(express.json());
// app.use(cors())


app.use('/movies',moviesRoutes)

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
