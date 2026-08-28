import AuthToast from "@/components/authtoast/AuthToast";
import FilterHomeQuestions from "@/components/filter/FilterHomeQuestions";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to use Next.js with TypeScript?",
    description:
      "I'm new to Next.js and I want to use TypeScript in my project. How can I set it up and what are the best practices?",
    tags: [
      { _id: "1", name: "nextjs" },
      { _id: "2", name: "typescript" },
      { _id: "3", name: "react" },
    ],
    auther: {
      _id: "1",
      name: "John Doe",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2023-06-01T12:00:00Z"),
  },
  {
    _id: "2",
    title: "What is the difference between React and Vue?",
    description:
      " I'm trying to decide between React and Vue for my next project. Can someone explain the main differences and advantages of each framework?",
    tags: [
      { _id: "4", name: "react" },
      { _id: "5", name: "vue" },
    ],
    auther: {
      _id: "2",
      name: "Jane Smith",
    },
    upvotes: 15,
    answers: 3,
    views: 200,
    createdAt: new Date("2023-06-02T15:30:00Z"),
  },
  {
    _id: "3",
    title: "How to optimize performance in a React application?",
    description:
      " I've noticed that my React application is running slowly. What are some techniques and best practices to improve performance in React apps?",
    tags: [
      { _id: "6", name: "react" },
      { _id: "7", name: "performance" },
    ],
    auther: {
      _id: "3",
      name: "Alice Johnson",
    },
    upvotes: 20,
    answers: 8,
    views: 300,
    createdAt: new Date("2023-06-03T09:45:00Z"),
  },
];
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;
  const normalizedQuery = query.toLowerCase();
  const filteredQuestions = questions
    .filter((question) => {
      if (!normalizedQuery) return true;

      return question.title.toLowerCase().includes(normalizedQuery);
    })
    .filter((question) => filter !== "unanswered" || question.answers === 0)
    .sort((firstQuestion, secondQuestion) => {
      switch (filter) {
        case "newest":
          return (
            secondQuestion.createdAt.getTime() -
            firstQuestion.createdAt.getTime()
          );
        case "recommended":
          return secondQuestion.upvotes - firstQuestion.upvotes;
        case "frequent":
          return secondQuestion.views - firstQuestion.views;
        default:
          return 0;
      }
    });

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
      <section className="mt-5 max-h-[calc(100vh-300px)] overflow-y-scroll">
        <ul className="flex flex-col gap-5">
          {filteredQuestions.map((question) => (
            <li
              key={question._id}
              className="rounded-1.5 border-light-300_dark700 border p-4 transition-all duration-300 hover:shadow-md"
            >
              <Link href={`/questions/${question._id}`}>
                <h2 className="text-dark200_light900 sm:h2-bold text-sm font-medium capitalize sm:text-lg">
                  {question.title}
                </h2>
                <p className="text-dark200_light900 sm:body-regular mt-2 text-sm sm:text-base">
                  {question.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="rounded-1.5 bg-light-300_dark700 text-dark200_light900 px-2 py-1 text-xs font-medium sm:text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AuthToast />
    </div>
  );
}

export default Home;
