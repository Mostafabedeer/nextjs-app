import Image from "next/image";
import { Button } from "../ui/button";
import { signInGoogleAction } from "@/lib/actions";

function SignInGoogleForm() {
  return (
    <form action={signInGoogleAction}>
      <Button
        type="submit"
        className="background-dark400_light900 text-dark200_light900 cursor-pointer border p-5 text-xs sm:text-sm"
      >
        <Image
          src="/icons/google.svg"
          width={25}
          height={25}
          alt="google icon"
          className="block h-5 w-5 invert sm:h-6 sm:w-6 dark:invert-0"
        />
      </Button>
    </form>
  );
}

export default SignInGoogleForm;
