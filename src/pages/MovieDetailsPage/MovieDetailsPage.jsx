import s from './MovieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { fetchMoviesById } from '../../services/api';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import Section from '../../components/Section/Section';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import Container from '../../components/Container/Container';
import clsx from 'clsx';
import { defaultImage } from '../../components/MovieList/MovieList';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMoviesById(movieId);
        setMovie(data);
        setIsError(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error('Fehler beim Laden der Filme');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {!isLoading && !isError && (
          <div className={s.wrapper}>
            <GoBackBtn />
            <div className={s.infoWrapper}>
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImage
                }
                alt={movie.title}
                className={s.movieImage}
              />
              <div className={s.movieInfo}>
                <p className={s.title}>{movie.title}</p>
                <p>
                  <strong>Genres:</strong>{' '}
                  {movie.genres?.map(genre => genre.name).join('  ')}
                </p>
                <p>
                  <strong>Bewertung:</strong> {movie.vote_average}
                </p>
                <p>{movie.release_date}</p>
                <p>
                  <strong>Budget:</strong> {movie.budget}$
                </p>
                <p>
                  <strong>Description:</strong> {movie.overview}
                </p>
              </div>
            </div>
            <nav className={s.nav}>
              <NavLink to="cast" className={setActiveClass}>
                Cast
              </NavLink>
              <NavLink to="reviews" className={setActiveClass}>
                Reviews
              </NavLink>
            </nav>
            <Outlet />
          </div>
        )}
      </Container>
    </Section>
  );
};

export default MovieDetailsPage;
