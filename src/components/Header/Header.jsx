import Navigation from '../Navigation/Navigation';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <h2 className={s.title}>Movie Demo Website</h2>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
