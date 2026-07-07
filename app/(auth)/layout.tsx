import { Button } from "@/components/ui/button";
import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-auth-light dark:bg-auth-dark flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="background-light800_dark200 mx-1.5 px-5 py-10 sm:mx-0 sm:px-10">
        <div>
          <div className="flex gap-2 sm:gap-4">
            <div className="flex flex-col gap-4 sm:gap-4">
              <h1 className="h3-bold sm:h1-bold background-light900_dark100 capitalize">
                join devflow
              </h1>
              <p className="text-dark400_light700 text-xs sm:text-xl">
                To get your questions answered
              </p>
            </div>

            <div>
              <Image
                src="/images/site-logo.svg"
                width={45}
                height={45}
                alt="Auth Image"
              />
            </div>
          </div>
        </div>
        {children}
        <div className="mt-5 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:gap-4">
          <div>
            <Button
              type="submit"
              className="background-dark400_light900 text-dark200_light900 border text-xs sm:text-sm"
            >
              <Image
                src="/icons/github.svg"
                width={15}
                height={15}
                alt="github icon"
                className="invert dark:invert-0"
              />
              <span className="ml-2">Sign in with Github</span>
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              className="background-dark400_light900 text-dark200_light900 border text-xs sm:text-sm"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
