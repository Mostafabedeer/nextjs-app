import ROUTES from "@/constants/routes";
import Link from "next/link";

interface TagCardProps {
  _id: string;
  tag: string;
}

function TagCard({ _id, tag }: TagCardProps) {
  return (
    <Link
      href={ROUTES.TAG(_id)}
      className="text-light-500 background-dark400_light800 hover:text-primary-500 flex items-center justify-between gap-1.5 rounded-md px-2 py-1 text-xs font-medium hover:underline sm:text-[12px] md:text-sm"
    >
      {tag}
    </Link>
  );
}

export default TagCard;
