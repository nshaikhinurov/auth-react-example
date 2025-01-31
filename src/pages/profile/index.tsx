import { motion } from "motion/react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { logout, useProfile } from "~/features/auth/model/use-auth";
import { LoadingView } from "./ui/loading-view";
import { ProfileView } from "./ui/profile-view";

export function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/auth");
  }, [navigate]);

  const { data, isLoading, isError, error } = useProfile();

  if (isError) {
    // Можно показать ошибку. error.response?.data?.message
    return (
      <div className="p-8 text-red-500">
        Failed to load profile. Possibly not authorized.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 2, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center max-w-96"
    >
      {isLoading ? (
        <LoadingView />
      ) : (
        data && (
          <ProfileView
            email={data.email}
            id={data.id}
            onLogout={handleLogout}
          />
        )
      )}
    </motion.div>
  );
}
