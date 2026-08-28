"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

function LocalSearch({ placeHolder }: { placeHolder: string }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {}, 300);

    return () => clearTimeout(delayDebounceFn);
  }, []);

  return (
    <div className="background-lightgradient_darkgradient flex items-center gap-2 p-4">
      <label htmlFor="search">
        <Image
          src="./icons/search.svg"
          alt="search icon"
          className="cursor-pointer"
          width={24}
          height={24}
        />
      </label>
      <input
        value={searchQuery}
        id="search"
        type="text"
        placeholder={placeHolder}
        className="placeholder rounded-1.5 text-dark200_light900 w-full border-none text-sm outline-none sm:text-base"
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
    </div>
  );
}

export default LocalSearch;
