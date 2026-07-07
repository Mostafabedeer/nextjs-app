import Image from "next/image";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

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
        <SocialAuthForm />
      </div>
    </div>
  );
}

export default AuthLayout;
