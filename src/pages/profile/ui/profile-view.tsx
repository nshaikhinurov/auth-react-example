import { AtSign, IdCard } from "lucide-react";
import { FC, useState } from "react";
import { pickRandom } from "~/shared/lib/pickRandom";
import { Avatar, AvatarImage } from "~/shared/ui/avatar";
import { Button } from "~/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";

const avatarSrcList = [
  "/png-avatars/001-clown-fish.png",
  "/png-avatars/002-lion.png",
  "/png-avatars/003-owl.png",
  "/png-avatars/004-flamingo.png",
  "/png-avatars/005-lama.png",
  "/png-avatars/006-buffalo.png",
  "/png-avatars/007-crab.png",
  "/png-avatars/008-sloth.png",
  "/png-avatars/009-penguin.png",
  "/png-avatars/010-chameleon.png",
  "/png-avatars/011-stingray.png",
  "/png-avatars/012-whale.png",
  "/png-avatars/013-spider.png",
  "/png-avatars/014-sheep.png",
  "/png-avatars/015-elephant.png",
  "/png-avatars/016-giraffe.png",
  "/png-avatars/017-frog.png",
  "/png-avatars/018-parrot.png",
  "/png-avatars/019-fox.png",
  "/png-avatars/020-hedgehog.png",
];

type ProfileProps = {
  email: string;
  id: string;
  onLogout: () => void;
};

export const ProfileView: FC<ProfileProps> = ({ email, id, onLogout }) => {
  const [avatarSrc] = useState(() => pickRandom(avatarSrcList));

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>View your profile information</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarSrc} alt="avatar" />
        </Avatar>

        <div className="flex flex-col gap-2 text-sm w-full">
          <div className="flex items-center gap-2">
            <IdCard /> <span className="truncate">{id}</span>
          </div>
          <div className="flex items-center gap-2">
            <AtSign /> <span className="truncate">{email}</span>
          </div>
        </div>

        <Button onClick={onLogout} className="mt-4 w-full">
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};
