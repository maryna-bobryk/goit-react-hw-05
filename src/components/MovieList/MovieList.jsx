import s from './MovieList.module.css';
import Grid from '../Grid/Grid';
import { Link, useLocation } from 'react-router-dom';

export const defaultImage =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      {/* <h2 className={s.title}>Trending today</h2> */}
      <Grid>
        {movies.map(movie => (
          <Link state={location} to={`/movies/${movie.id}`} key={movie.id}>
            <li className={s.movieItem}>
              <img
                className={s.movieImage}
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImage
                }
                alt={movie.original_title}
                title={movie.original_title}
              />
              <div className={s.movieInfo}>
                <p className={s.movieTitle}>{movie.title}</p>
              </div>
              <p className={s.average}>
                {movie.vote_average === 0 ? 0 : movie.vote_average.toFixed(1)}
              </p>
            </li>
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default MovieList;
