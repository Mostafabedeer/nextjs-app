import AuthToast from "@/components/authtoast/AuthToast";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import Link from "next/link";

async function Home() {
  return (
    <div className="container mx-auto">
      <section className="flex items-center justify-between">
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
        <LocalSearch placeHolder="Search for Question Here.." />
      </section>
      <section className="mt-5">fliters</section>

      <AuthToast />
    </div>
  );
}

export default Home;
