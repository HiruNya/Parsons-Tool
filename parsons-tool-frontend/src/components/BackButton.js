import { useNavigate } from 'react-router-dom';

export default function BackButton({ text }) {
  const navigate = useNavigate();

  return (
    <button className="bg-yellow-200 p-2 rounded-lg absolute left-5" onClick={() => navigate(-1)}>
      {text || '←'}
    </button>
  );
}
