import { cn, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgSrc: string;
  alt: string;
  title: string;
  titleStyles?: string;
  value: number | string;
  href?: string;
  createdAt?: Date;
  textStyle?: string;
  imgStyle?: string;
  isAuthor?: boolean;
  titleStyle?: string;
}

function Metric({
  imgSrc,
  href,
  alt,
  value,
  title,
  textStyle,
  imgStyle,
  createdAt,
  titleStyles,
  isAuthor = false,
}: MetricProps) {
  const MatricContent = (
    <>
      <div className="flex items-center gap-0.5">
        <Image
          src={imgSrc}
          alt={alt}
          width={16}
          height={16}
          className={`${imgStyle} `}
        />
        <p className={`${textStyle} flex items-center gap-0.5`}>
          {isAuthor && createdAt ? <>{String(value).split(" ")[0]}</> : null}
          {title ? (
            <span className={cn(`small-regular line-clamp-1`, titleStyles)}>
              {value} {title}
            </span>
          ) : null}
        </p>
      </div>
    </>
  );
  return href ? (
    <Link href={href} className="flex items-center gap-0.5">
      {MatricContent}
    </Link>
  ) : (
    <div>{MatricContent}</div>
  );
}

export default Metric;
