import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import FilterHomeQuestions from "@/components/filter/FilterHomeQuestions";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

async function Home({ searchParams }: SearchParams) {
  const { query, filter, page, pageSize } = await searchParams;
  const { data, success, error } = await getQuestions({
    query: query as string,
    filter: filter as string,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });
  const questions = data?.questions ?? [];

  return (
    <div className="container mx-auto">
      <section className="mt-5 flex items-center justify-between">
        <h1 className="text-dark200_light900 sm:h1-bold text-sm font-medium capitalize sm:text-lg">
          all questions
        </h1>
        <button className="text-light-900 primary-gradient rounded-1.5 px-5 py-2 text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg sm:px-10 sm:py-4 sm:text-base">
          <Link className="block h-full w-full" href={ROUTES.ASK_QUESTION}>
            Ask a Question
          </Link>
        </button>
      </section>
      <section className="mt-5">
        <LocalSearch
          route={ROUTES.Home}
          imgSrc="/icons/search.svg"
          placeholder="Search for Question Here.."
          iconPosition="left"
        />
      </section>
      <section className="mt-5">
        <FilterHomeQuestions />
      </section>
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions: Question[]) =>
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        }
      />
    </div>
  );
}

export default Home;
