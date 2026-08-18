import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-auth-light dark:bg-auth-dark flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="background-light800_dark200 mx-1.5 max-h-screen min-w-xs px-5 py-3 sm:mx-0 sm:overflow-y-auto sm:px-10 md:max-w-md md:py-5">
        <div>
          <div className="flex flex-col justify-center gap-1">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src="/images/site-logo.svg"
                  width={30}
                  height={30}
                  alt="Auth Image"
                  className="h-8 w-8 sm:h-12 sm:w-12"
                />
              </div>

              <h1 className="h3-bold sm:h1-bold text-dark100_light900 capitalize">
                <span className="font-light">dev</span>
                <span className="text-primary-500">overflow</span>
              </h1>
            </div>
            <p className="text-dark400_light700 mb-2 text-xs sm:text-sm">
              To get your questions answered
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
