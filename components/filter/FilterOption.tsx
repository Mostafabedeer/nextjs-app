"use client";

import { formUrlParams, removeUrlParams } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterOptionProps {
  filterOption: { name: string; value: string };
}

function FilterOption({ filterOption }: FilterOptionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") || "";

  const handleFilterClick = (filter: string) => {
    if (filter === activeFilter) {
      const newUrl = removeUrlParams({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });

      router.push(newUrl, { scroll: false });
      return;
    }

    const newUrl = formUrlParams({
      params: searchParams.toString(),
      key: "filter",
      value: filter,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <li key={filterOption.name}>
      <button
        className={`rounded-1.5 cursor-pointer px-2 py-1 text-xs font-medium transition-all duration-300 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm ${
          activeFilter === filterOption.value
            ? "primary-gradient text-light-900"
            : "text-dark400_light500 background-light800_darkgradient"
        }`}
        onClick={() => handleFilterClick(filterOption.value)}
      >
        {filterOption.name}
      </button>
    </li>
  );
}

export default FilterOption;
