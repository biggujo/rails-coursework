import { useState } from 'react';
import toast from 'react-hot-toast';

type ReturnData<T> = [T | null, (value: T) => void];

function useLocalStorage<T>(key: string): ReturnData<T> {
  const [value, setValue] = useState(() => {
    try {
      const value: string = localStorage.getItem(key)!;
      const parsedValue: T = JSON.parse(value!);

      return parsedValue;
    } catch (e) {
      toast.error(`Couldn't read from the local storage: ${key}`);
      return null;
    }
  });

  const lsSetValue = (value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);

      setValue(value);
    } catch (e) {
      toast.error(`Couldn't write to the local storage: ${key}`);
    }
  };

  return [value, lsSetValue];
}

export default useLocalStorage;
