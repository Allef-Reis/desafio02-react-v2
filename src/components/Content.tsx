import { useEffect, useState } from "react";
import { IGenreResponse } from "../model/IGenreResponse";
import { IMovie } from "../model/IMovies";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<IGenreResponse>({} as IGenreResponse);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    api.get<IGenreResponse>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
    api.get<IMovie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    })

  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}