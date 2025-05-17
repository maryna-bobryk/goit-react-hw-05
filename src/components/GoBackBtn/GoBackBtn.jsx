import { Link, useLocation } from 'react-router-dom';
import s from './GoBackBtn.module.css';
import { useRef } from 'react';

const GoBackBtn = () => {
  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  return (
    <Link className={s.link} to={backLink.current}>
      GoBack
    </Link>
  );
};

export default GoBackBtn;
