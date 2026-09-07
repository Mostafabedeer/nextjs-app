import { FILTER_OPTIONS } from "@/constants";
import FilterOption from "./FilterOption";

function FilterHomeQuestions() {
  return (
    <ul className="flex flex-wrap items-center gap-1 sm:gap-4">
      {FILTER_OPTIONS.map((filterOption) => (
        <FilterOption key={filterOption.value} filterOption={filterOption} />
      ))}
    </ul>
  );
}

export default FilterHomeQuestions;
