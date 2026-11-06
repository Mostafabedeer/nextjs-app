import { auth } from "@/auth";
import AskQuestionForm from "@/components/forms/AskQuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { notFound, redirect } from "next/navigation";

async function Page({ params }: RouteParams) {
  const { questionId } = await params;
  if (!questionId) notFound();

  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  const { data: question, success } = await getQuestion({ questionId });

  if (!success) notFound();

  if (question?.author._id.toString() !== session?.user?.id) {
    redirect(ROUTES.QUESTION(questionId));
  }

  return <AskQuestionForm question={question} isEdit={true} />;
}

export default Page;
