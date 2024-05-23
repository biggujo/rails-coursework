import TextForm from '../TextForm';

interface Props {
  onSubmit: (value: string) => void;
}

export default function TextFormMessage({ onSubmit }: Props) {
  return <TextForm buttonText={'Send message'} onSubmit={onSubmit} />;
}
