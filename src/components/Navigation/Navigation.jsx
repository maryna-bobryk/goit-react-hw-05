import clsx from 'clsx';
import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';

const setActiveClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.activeLink);
};

const Navigation = () => {
  return (
    <>
      <nav className={s.nav}>
        <NavLink to="/" className={setActiveClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={setActiveClass}>
          Movie
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
