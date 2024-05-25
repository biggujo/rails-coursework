import { useSelector } from 'react-redux';
import { selectAuthToken } from '../redux/auth/selectors.ts';
import { useEffect, useState } from 'react';
import axios from 'axios';

type FunctionInterface = () => boolean;

const useAuthorizationLoader: FunctionInterface = () => {
  const token = useSelector(selectAuthToken);
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  useEffect(() => {
    document.cookie = `X-Authorization=${token !== null ? token.slice(7) : ''}; path=/`;
    axios.defaults.headers.common.Authorization = token;

    setIsTokenLoading(true);
  }, [token]);

  return isTokenLoading;
};

export default useAuthorizationLoader;
