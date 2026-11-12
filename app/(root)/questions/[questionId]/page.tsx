import Link from "next/link";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { Suspense } from "react";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import { getQuestion } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { Metadata } from "next";
import ROUTES from "@/constants/routes";
import TagCard from "@/components/cards/TagCard";
import { Preview } from "@/components/editor/Preview";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) {
    return {
      title: "Question not found",
      description: "This question does not exist.",
    };
  }

  return {
    title: question.title,
    description: question.content.slice(0, 100),
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.content.slice(0, 100),
    },
  };
}

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { questionId } = await params;
  const { page, pageSize, filter } = await searchParams;
  const { success, data: question } = await getQuestion({ questionId });

  if (!success || !question) notFound();

  const { author, createdAt, answers, views, tags, content, title } = question;

  return (
    <div className="mx-4 my-3 sm:mx-2 sm:my-0">
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              userId={author._id}
              name={author.name}
              imgUrl={author.image}
              className="size-5.5"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>
        </div>

        <h2 className="h3-semibold sm:h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mt-5 mb-8 flex flex-wrap gap-4">
        <Metric
          imgSrc="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyle="small-regular text-dark400_light700"
        />
        <Metric
          imgSrc="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyle="small-regular text-dark400_light700"
        />
        <Metric
          imgSrc="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title=""
          textStyle="small-regular text-dark400_light700"
        />
      </div>
      <Preview content={content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionDetails;
