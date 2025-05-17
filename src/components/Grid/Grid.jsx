import s from './Grid.module.css';

const Grid = ({ children }) => {
  return <ul className={s.list}>{children}</ul>;
};
export default Grid;
