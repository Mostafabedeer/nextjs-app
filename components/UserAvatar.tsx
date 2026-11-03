import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  imgUrl?: string | null;
  userId?: string;
  name?: string | null;
  className?: string;
}

function UserAvatar({
  imgUrl,
  userId,
  name,
  className = "h-9 w-9",
}: UserAvatarProps) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={ROUTES.PROFILE(userId)}>
      <Avatar className={className}>
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={name ? name : "User Avatar"}
            className="h-full w-full rounded-full object-cover"
            width={36}
            height={36}
          />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}

export default UserAvatar;
