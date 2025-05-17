import s from './HomePage.module.css';
import { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import { fetchMovies } from '../../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies(pages);
        setMovies(data);
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
  }, [pages]);

  return (
    <div>
      <Section>
        <Container>
          {isLoading && <Loader />}
          {!isLoading && !isError && <MovieList movies={movies} />}
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
