import { useParams } from 'react-router-dom';

export default function ChatPage() {
  const { id } = useParams();

  return <div>ID: {id}</div>;
}
