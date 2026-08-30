import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import TagCard from "./TagCard";
import Metric from "../Metric";
import ROUTES from "@/constants/routes";

interface QuestionCardProps {
  question: Question;
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <li
      key={question._id}
      className="rounded-1.5 border-light-300_dark700 background-light900_darkgradient border px-5 py-6 transition-all duration-300 hover:shadow-md sm:px-11 sm:py-9"
    >
      <p className="text-xs sm:hidden">{getTimeStamp(question.createdAt)}</p>
      <Link href={`/questions/${question._id}`}>
        <h2 className="h3-semibold text-dark200_light900">{question.title}</h2>
      </Link>
      {/* tags */}
      <ul className="mt-4 flex gap-2">
        {question.tags.map((tag) => (
          <li key={tag._id}>
            <TagCard _id={tag._id} name={tag.name} />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
        <Metric
          imgSrc="/icons/avatar.svg"
          imgStyle="rounded-full"
          alt={question.author.name}
          value={question.author.name}
          title={`${question.author.name.split(" ")[0]}• asked ${getTimeStamp(question.createdAt)}`}
          href={ROUTES.PROFILE(question.author._id)}
          textStyle="text-dark400_light500 text-xs sm:text-sm"
          isAuthor
          createdAt={question.createdAt}
          titleStyles="max-sm:hidden"
        />

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Metric
            imgSrc="/icons/like.svg"
            alt="like"
            value={question.upvotes}
            title=" Votes"
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imgSrc="/icons/message.svg"
            alt="answers"
            value={question.answers}
            title=" Answers"
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            imgSrc="/icons/eye.svg"
            alt="views"
            value={question.views}
            title=" Views"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </li>
  );
}

export default QuestionCard;
