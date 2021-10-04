import { useScrollToTop } from '../utils/hooks';

import InputForm from '../components/InputForm';

import '../styles/addbook.scss';

const AddBook = () => {
  useScrollToTop();

  return (
    <section className="addbook">
      <h1 className="addbook__title">Add Book</h1>
      <InputForm type="add" />
    </section>
  );
};
export default AddBook;
