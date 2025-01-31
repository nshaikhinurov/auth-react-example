import { useProfile } from "~/features/auth/model/use-auth";
import { ProfileView } from "./ui/profile-view";

export function ProfilePage() {
  const { data, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return (
      <div className="p-8">
        {/* Skeleton */}
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    // Можно показать ошибку. error.response?.data?.message
    return (
      <div className="p-8 text-red-500">
        Failed to load profile. Possibly not authorized.
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <ProfileView email={data.email} id={data.id} />;
}
