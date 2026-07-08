import Image from "next/image";
import { Button } from "../ui/button";
import { signInGoogleAction } from "@/lib/actions";

function SignInGoogleForm() {
  return (
    <form action={signInGoogleAction}>
      <Button
        type="submit"
        className="background-dark400_light900 text-dark200_light900 cursor-pointer border text-xs sm:text-sm"
      >
        <Image
          src="/icons/google.svg"
          width={15}
          height={15}
          alt="google icon"
          className="invert dark:invert-0"
        />
        <span className="ml-2">Sign in with Google</span>
      </Button>
    </form>
  );
}

export default SignInGoogleForm;
