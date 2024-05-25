import TextForm from '../TextForm';

interface Props {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export default function TextFormMessage({ disabled, onSubmit }: Props) {
  return (
    <TextForm
      buttonText={'Send message'}
      disabled={disabled}
      onSubmit={onSubmit}
    />
  );
}
