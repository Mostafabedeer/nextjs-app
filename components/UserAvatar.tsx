import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Avatar, AvatarBadge, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imgUrl?: string | null;
  userId: string;
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
}

function UserAvatar({
  imgUrl,
  userId,
  name,
  className = "h-9 w-9",
  fallbackClassName,
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
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
              fallbackClassName,
            )}
          >
            {initials}
          </AvatarFallback>
        )}
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
    </Link>
  );
}

export default UserAvatar;
