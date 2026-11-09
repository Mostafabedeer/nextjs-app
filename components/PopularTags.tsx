import { PopularTagsData } from "@/constants";
import TagCard from "./cards/TagCard";

function PopularTags() {
  // .div6 {
  //     grid-column: span 2 / span 2;
  //     grid-row: span 4 / span 4;
  //     grid-column-start: 9;
  //     grid-row-start: 6;
  // }
  return (
    <div className="sm:start border-dark100_light900 background-light900_dark200 col-span-2 col-start-7 row-span-2 row-start-4 hidden min-h-0 flex-col overflow-hidden rounded-lg border p-4 lg:flex">
      <h2 className="text-dark200_light900 mb-4 shrink-0 text-lg font-bold">
        Popular Tags
      </h2>
      <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-2 text-sm">
        {PopularTagsData.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <TagCard _id={String(item.id)} name={item.tag} compact />
            <span className="block">{item.numberOfQuestions}+</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularTags;
