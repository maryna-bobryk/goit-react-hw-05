import axios from 'axios';

const axiosMovie = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjlmYjk1NzdmYzVmOWZjYmFkNWFlNjFmNDQ2N2IxZSIsIm5iZiI6MTc0NTE2MDM1Mi4xLCJzdWIiOiI2ODA1MDhhMGMzZThlNzRiNmRlZTE4MWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mkdBAHJSXwy59OTw8rMeyIy_okaZZQW-Ila0ZJ0r8jw',
    accept: 'application/json',
  },
});

export const fetchMovies = async () => {
  const response = await axiosMovie.get('/trending/movie/day');
  return response.data.results;
};

export const fetchMoviesById = async movieId => {
  const response = await axiosMovie.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchCastMovieById = async movieId => {
  const response = await axiosMovie.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const fetchReviewsMovieById = async movieId => {
  const response = await axiosMovie.get(`/movie/${movieId}/reviews`);
  return response.data;
};

export const fetchSearchMovies = async query => {
  const response = await axiosMovie.get(`/search/movie?query=${query}`);
  return response.data;
};
