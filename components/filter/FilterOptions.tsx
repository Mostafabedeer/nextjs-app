import { FILTER_OPTIONS } from "@/constants";
import FilterOption from "./FilterOption";

interface FilterOptionsProps {
  options?: { name: string; value: string }[];
}

function FilterOptions({ options = FILTER_OPTIONS }: FilterOptionsProps) {
  return (
    <ul className="flex flex-wrap items-center gap-1 sm:gap-4">
      {options.map((filterOption) => (
        <FilterOption key={filterOption.value} filterOption={filterOption} />
      ))}
    </ul>
  );
}

export default FilterOptions;
