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
    <div className="sm:start border-dark100_light900 background-light900_dark200 col-span-2 col-start-7 row-span-2 row-start-4 hidden rounded-lg border p-4 md:hidden lg:block">
      <div>
        <h2 className="text-dark200_light900 mb-4 text-lg font-bold">
          Popular Tags
        </h2>
        <ul className="flex flex-col gap-4 text-sm">
          {PopularTagsData.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <TagCard
                item={{
                  ...item,
                  _id: String(item.id),
                  numberOfQuestions: String(item.numberOfQuestions),
                }}
              />
              <span className="block">{item.numberOfQuestions}+</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopularTags;
