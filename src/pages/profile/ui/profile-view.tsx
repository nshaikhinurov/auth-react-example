import { FC } from "react";
import { useNavigate } from "react-router";
import { logout } from "~/features/auth/model/use-auth";

type ProfileProps = {
  email: string;
  id: string;
};

export const ProfileView: FC<ProfileProps> = ({ email, id }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};
