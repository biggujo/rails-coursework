import { useDispatch } from 'react-redux';
import { PostsFilters } from '../../interfaces';
import { useFormik } from 'formik';
import { AppDispatch } from '../../redux/store.ts';
import { setPostsFilters } from '../../redux/filters/slice.ts';

const initialValues: PostsFilters = {
  content: '',
  start_date: '',
  end_date: '',
  sort_activity: '',
  sort_date: 'desc',
};

const usePostsFiltersForm = () => {
  const dispatch: AppDispatch = useDispatch();

  return useFormik({
    initialValues,
    onSubmit: async values => {
      dispatch(setPostsFilters(values));
    },
  });
};

export default usePostsFiltersForm;
