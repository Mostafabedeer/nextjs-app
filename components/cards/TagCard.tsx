import ROUTES from "@/constants/routes";
import Link from "next/link";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: number;
}

function TagCard({ _id, name }: TagCardProps) {
  return (
    <Link
      href={ROUTES.TAG(_id)}
      className="text-light-500 background-dark400_light800 hover:text-primary-500 flex items-center justify-between gap-1.5 rounded-md px-2 py-1 text-xs font-medium hover:underline sm:text-[12px] md:text-sm"
    >
      {name}
    </Link>
  );
}

export default TagCard;
