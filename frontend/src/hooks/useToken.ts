import axios from 'axios';
import useLocalStorage from './useLocalStorage.ts';
import Keys from '../utils/ls-keys.tsx';
import { useEffect } from 'react';

function useToken(): [string | null, (value: string) => void] {
  const [token, setToken] = useLocalStorage<string>(Keys.AUTH_TOKEN);

  useEffect(() => {
    document.cookie = `X-Authorization=${token !== null ? token.slice(7) : ''}; path=/`;
    axios.defaults.headers.common.Authorization = token;
  }, [token]);

  return [token, setToken];
}

export default useToken;
