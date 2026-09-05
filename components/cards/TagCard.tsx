import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

function TagCard({
  _id,
  name,
  remove,
  showCount,
  isButton,
  compact,
  questions,
  handleRemove,
}: TagCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const content = (
    <>
      {remove && (
        <div className="flex items-center justify-between gap-1.5 rounded-md px-2 py-1 text-xs font-medium sm:text-[12px] md:text-sm">
          <p>{name}</p>
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        </div>
      )}
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );
  if (compact) {
    return isButton ? (
      <button
        onClick={handleClick}
        className="text-light-500 background-dark400_light800 flex items-center justify-between gap-1.5 rounded-md px-2 py-1 text-2xl font-medium sm:text-[12px] md:text-sm"
      >
        {content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  }
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
