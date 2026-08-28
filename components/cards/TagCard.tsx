import ROUTES from "@/constants/routes";
import Link from "next/link";

function TagCard({
  item,
}: {
  item: {
    id?: string | number;
    _id?: string | number;
    tag: string;
    numberOfQuestions: string;
  };
}) {
  const tagId = item._id ?? item.id;
  const normalizedTagId =
    tagId !== undefined && tagId !== null ? String(tagId) : undefined;

  return (
    <Link
      href={normalizedTagId ? ROUTES.TAG(normalizedTagId) : ROUTES.TAGS}
      className="text-light-500 background-dark400_light800 hover:text-primary-500 flex items-center justify-between gap-1.5 rounded-md px-2 py-1 font-medium hover:underline sm:text-[12px] md:text-sm"
    >
      {item.tag}
    </Link>
  );
}

export default TagCard;
