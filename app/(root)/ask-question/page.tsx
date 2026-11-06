import { auth } from "@/auth";
import AskQuestionForm from "@/components/forms/AskQuestionForm";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return <AskQuestionForm />;
}

export default Page;
