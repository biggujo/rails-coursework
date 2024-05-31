import Nullable from './Nullable.interface.ts';

interface GroupFormValues {
  name: string;
  description: string;
  profile_photo: Nullable<File>;
}

export default GroupFormValues;
