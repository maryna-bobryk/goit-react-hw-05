import s from './MoviesPage.module.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const MoviesPage = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSearchMovies(query);
        setMovieSearch(data.results);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  const handleSearch = newQuery => {
    if (!newQuery) {
      setSearchParams('');
      return;
    }
    setSearchParams({ query: newQuery });
  };

  return (
    <Section>
      <Container>
        <h2 className={s.title}>Search movie</h2>
        <SearchForm onSubmit={handleSearch} />
        {isLoading && <Loader />}
        {!isLoading && !isError && <MovieList movies={movieSearch} />}
      </Container>
    </Section>
  );
};

export default MoviesPage;
