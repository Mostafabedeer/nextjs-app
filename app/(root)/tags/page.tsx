import { getTags } from "@/lib/actions/tag.action";
import { getTechDescription } from "@/lib/utils";
import TagDescription from "@/components/TagDescription";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import FilterOptions from "@/components/filter/FilterOptions";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_TAGS } from "@/constants/states";
import { TAG_FILTER_OPTIONS } from "@/constants";

async function Page({ searchParams }: RouteParams) {
  const { page = 1, pageSize = 10, query = "", filter } = await searchParams;
  const { success, data, error } = await getTags({
    page: Number(page),
    pageSize: Number(pageSize),
    query,
    filter,
  });
  const tags = Array.isArray(data?.tags) ? data.tags : [];

  return (
    <div className="container mx-auto flex h-full min-h-0 flex-col px-2 sm:px-4 lg:px-0">
      <section className="mt-5">
        <h1 className="text-dark200_light900 sm:h1-bold text-sm font-medium capitalize sm:text-lg">
          Tags
        </h1>
      </section>
      <section className="mt-5 shrink-0">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search for Tags Here.."
          iconPosition="left"
        />
      </section>
      <section className="mt-5 mb-3 shrink-0">
        <FilterOptions options={TAG_FILTER_OPTIONS} />
      </section>
      <DataRenderer
        success={success}
        error={error}
        data={tags}
        empty={EMPTY_TAGS}
        render={(tags: Tag[]) => (
          <ul className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {tags.map((tag) => (
              <li key={tag._id} className="flex h-full flex-col gap-3.5">
                <div className="border-light-300_dark700 background-light900_dark200 h-full rounded-2xl border px-7 py-10 transition-all duration-300 hover:shadow-md sm:px-11 sm:py-9">
                  <h2 className="sm:h3-semibold background-dark400_light800 text-dark300_light900 rounded-1.5 flex w-fit items-center justify-center px-5 py-1.5">
                    {tag.name}
                  </h2>
                  <TagDescription description={getTechDescription(tag.name)} />
                  <Link
                    href={ROUTES.TAG(tag._id)}
                    className="text-dark400_light500 mt-2 flex items-center gap-1 text-sm font-medium"
                  >
                    <span className="primary-text-gradient text-sm font-semibold sm:text-lg">
                      {tag.questions}+
                    </span>
                    Questions
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}

export default Page;
