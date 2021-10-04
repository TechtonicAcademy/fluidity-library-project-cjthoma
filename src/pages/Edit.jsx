import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editBook, deleteBook, getImage } from '../utils/API';
import { useScrollToTop, useGetBookDataOnload } from '../utils/hooks';

import InputForm from '../components/InputForm';
import '../styles/edit.scss';

const Edit = () => {
  useScrollToTop();

  return (
    <section className="edit">
      <h1 className="edit__title">Edit Book</h1>
      <InputForm type="edit" />
    </section>
  );
};

export default Edit;
