import { useState } from 'react';

type ReturnData<T> = [T, (value: T) => void];

function useLocalStorage<T>(key: string): ReturnData<T> {
  const [value] = useState(() => {
    try {
      const value: string = localStorage.getItem(key)!;
      const parsedValue: T = JSON.parse(value!);

      return parsedValue;
    } catch (e) {
      console.log(e);
    }
  });

  const setValue = (value: T) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.log(e);
    }
  };

  return [value!, setValue];
}

export default useLocalStorage;
