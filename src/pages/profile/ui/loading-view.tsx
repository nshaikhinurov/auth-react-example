import { Button } from "~/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/shared/ui/card";
import { Skeleton } from "~/shared/ui/skeleton";

export const LoadingView = () => {
  return (
    <Card className="w-full ">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>View your profile information</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-sm" />

        <div className="space-y-2 w-full ">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </div>

        <Button disabled className="mt-4 w-full">
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};
