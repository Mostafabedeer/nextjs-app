"use client";

import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlParams, removeUrlParams } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
  iconPosition?: "left" | "right";
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,

  iconPosition = "left",
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  console.log(pathname, router, searchParams, query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery === query) return;
      if (searchQuery) {
        const newUrl = formUrlParams({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeUrlParams({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname, query]);

  return (
    <div className="background-lightgradient_darkgradient flex items-center gap-2 p-4">
      {iconPosition === "left" && (
        <label htmlFor="search">
          <Image
            src={imgSrc}
            alt="search icon"
            className="cursor-pointer"
            width={24}
            height={24}
          />
        </label>
      )}
      <input
        value={searchQuery}
        id="search"
        type="text"
        placeholder={placeholder}
        className="placeholder text-dark200_light900 rounded-2 w-full border-none text-sm outline-none sm:text-base"
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
    </div>
  );
};

export default LocalSearch;
