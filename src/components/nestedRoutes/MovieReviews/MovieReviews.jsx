import s from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewsMovieById } from '../../../services/api';
import Loader from '../../Loader/Loader';
import toast from 'react-hot-toast';

const MovieReviews = () => {
  const [movieReview, setMovieReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchReviewsMovieById(movieId);
        // console.log(data);
        setMovieReview(data.results);
        if (data.results.length === 0) {
          toast.error('Keine Kommentare vorhanden.');
        }
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

  const toggleExpand = id => {
    setExpandedReviewIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && !isError && (
        <ul className={s.reviewList}>
          {movieReview.map(item => {
            const isExpanded = expandedReviewIds.includes(item.id);
            return (
              <li key={item.id} className={s.reviewItem}>
                <p className={s.name}>{item.author}</p>
                <p className={isExpanded ? s.textPreview : s.textFull}>
                  {item.content}
                </p>
                <button onClick={() => toggleExpand(item.id)}>
                  {isExpanded ? 'Weniger' : 'Mehr'}
                </button>
                <p className={s.datum}>
                  {new Date(item.updated_at).toLocaleDateString()}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
