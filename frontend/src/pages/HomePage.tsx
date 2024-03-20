import useLocalStorage from '../hooks';
import { useEffect, useRef } from 'react';
import Keys from '../utils/ls-keys.tsx';
import useUserSignInMutation from '../hooks/mutation/useSignInMutation.ts';
import usePing from '../hooks/query';
import useSignInMutation from '../hooks/mutation/useSignInMutation.ts';
import { useAuth } from '../providers';


export default function HomePage() {
  const signInMutation = useSignInMutation();

  useEffect(() => {
    const mutateSignIn = async () => {
      const response = await signInMutation.mutateAsync({
        email: 'b@b.b',
        password: 'bbbbbb',
      });

      console.log(response!.headers.authorization);
    };

    mutateSignIn();
  }, [signInMutation]);

  return (<>
    <div>HomePage</div>
  </>);
}
