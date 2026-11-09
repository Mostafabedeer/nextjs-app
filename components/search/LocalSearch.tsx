"use client";

import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useRef } from "react";

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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (
        window.location.pathname !== route ||
        searchInputRef.current?.value !== value
      ) {
        return;
      }

      if (value) {
        const newUrl = formUrlParams({
          params: searchParams.toString(),
          key: "query",
          value,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeUrlParams({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);
  };

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
        key={`${pathname}:${query}`}
        ref={searchInputRef}
        defaultValue={pathname === route ? query : ""}
        id="search"
        type="text"
        placeholder={placeholder}
        className="placeholder text-dark200_light900 rounded-2 w-full border-none text-sm outline-none sm:text-base"
        onChange={(e) => handleSearchChange(e.target.value)}
      ></input>
    </div>
  );
};

export default LocalSearch;
