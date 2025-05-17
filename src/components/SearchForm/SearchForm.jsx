import s from './SearchForm.module.css';
import { Field, Form, Formik } from 'formik';

const SearchForm = ({ onSubmit }) => {
  const initialValues = {
    query: '',
  };
  const handleSubmit = (values, { resetForm }) => {
    // console.log(values);
    onSubmit(values.query);
    resetForm();
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form className={s.form}>
        <Field
          name="query"
          type="text"
          className={s.input}
          placeholder="Filmtitel eingeben"
          autoFocus
        />
        <button type="submit" className={s.surchBtn}>
          Suchen
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;

// const SearchForm = ({ onSubmit }) => {
// const [query, setQuery] = useState('');

// const handleChange = e => {
//   setQuery(e.target.value);
// };

// const handleSubmit = e => {
//   e.preventDefault();
//   if (!query.trim()) {
//     alert('Bitte gib einen Filmtitel ein.');
//     return;
//   }
//   onSubmit(query);
//   setQuery('');
// };

// return (
// <form className={s.form} onSubmit={handleSubmit}>
//   <input
//     type="text"
//     className={s.input}
//     value={query}
//     onChange={handleChange}
//     placeholder="Filmtitel eingeben"
//     autoFocus
//   />
//   <button type="submit" className={s.button}>
//     Suchen
//   </button>
// </form>
//   );
// };

// export default SearchForm;
