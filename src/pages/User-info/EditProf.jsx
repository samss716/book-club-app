import { useNavigate } from 'react-router-dom';

export default function EditProf() {
    const navigate = useNavigate();

    return (
        <div className="p-4">
        <button
            onClick={() => navigate('/user')}
            className="mb-4 text-sm text-[#446850] hover:underline">
            ← Back to Profile
            </button>

            <h1 className="text-xl font-bold mb-2"> Edit Profile Page </h1>
            </div>
    );
  }
  