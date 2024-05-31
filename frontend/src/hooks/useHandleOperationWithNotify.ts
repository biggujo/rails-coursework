import myToast from '../utils/myToast.tsx';

const useHandleOperationWithNotify =
  () =>
  ({ dispatch, operation }) =>
  async () => {
    try {
      await dispatch(operation).unwrap();
    } catch (e) {
      myToast({
        message: e instanceof Error ? e.message : (e as string),
        severity: 'error',
      });
    }
  };

export default useHandleOperationWithNotify;
