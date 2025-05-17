import { useEffect, useState } from 'react';
import s from './MovieCast.module.css';
import { useParams } from 'react-router-dom';
import { fetchCastMovieById } from '../../../services/api';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import { defaultImage } from '../../MovieList/MovieList';

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchCastMovieById(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error('Fehler beim Laden der Cast-Daten');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && !isError && (
        <ul className={s.castList}>
          {movieCast.map(item => (
            <li key={item.id} className={s.castItem}>
              <img
                className={s.castImage}
                alt={item.name}
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                    : defaultImage
                }
              />
              <p>
                <strong> {item.name}</strong>
              </p>
              <p>{item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
