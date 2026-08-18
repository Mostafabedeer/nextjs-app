import Image from "next/image";
import { Button } from "../ui/button";
import { signInGithubAction } from "@/lib/actions";

function SignInGithubForm() {
  return (
    <form action={signInGithubAction}>
      <Button
        type="submit"
        className="background-dark400_light900 flex cursor-pointer items-center justify-center border p-5 text-xs sm:text-sm"
      >
        <Image
          src="/icons/github.svg"
          width={25}
          height={25}
          alt="github icon"
          className="block h-5 w-5 invert sm:h-6 sm:w-6 dark:invert-0"
        />
      </Button>
    </form>
  );
}

export default SignInGithubForm;
