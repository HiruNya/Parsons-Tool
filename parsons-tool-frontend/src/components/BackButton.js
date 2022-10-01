import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="text-2xl bg-yellow-200 w-8 rounded-lg absolute left-5" onClick={() => navigate(-1)}>
      ←
    </button>
  );
}
