import { useSelector } from 'react-redux';
import { selectAuthToken } from '../redux/auth/selectors.ts';
import { useEffect } from 'react';
import axios from 'axios';

type FunctionInterface = () => void;

const useAuthorizationLoader: FunctionInterface = () => {
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    document.cookie = `X-Authorization=${token !== null ? token.slice(7) : ''}; path=/`;
    axios.defaults.headers.common.Authorization = token;
  }, [token]);
};

export default useAuthorizationLoader;
