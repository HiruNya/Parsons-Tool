import { useNavigate } from 'react-router-dom';

export default function BackButton({ text }) {
  const navigate = useNavigate();

  return (
    <button
      className="bg-yellow-200 hover:bg-yellow-300 focus:bg-yellow-300 p-2 rounded-lg absolute left-5"
      onClick={() => navigate(-1)}
    >
      {text || '←'}
    </button>
  );
}
