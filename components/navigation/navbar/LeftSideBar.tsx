import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import ROUTES from "@/constants/routes";

async function RightSideBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="background-light900_dark200 sm:border-dark100_light900 hidden rounded-lg border sm:block sm:h-full sm:grid-cols-2 sm:grid-rows-10 sm:px-2 md:px-4">
      <Link href="/" className="hidden items-center gap-1 sm:flex">
        <div className="mt-1 ml-2 flex items-center justify-center">
          <Image
            src="/images/site-logo.svg"
            width={15}
            height={15}
            alt="Logo"
          />

          <p className="font-space-grotesk text-dark-100 dark:text-light-900 my-4 text-lg">
            Dev<span className="text-primary-500">Overflow</span>
          </p>
        </div>
      </Link>
      <NavLinks />
      {user ? (
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button
            type="submit"
            className="base-medium mt-10 w-fit cursor-pointer bg-transparent! px-4"
          >
            <LogOut className="size-5 text-black dark:text-white" />
            <span className="text-dark300_light900">Logout</span>
          </Button>
        </form>
      ) : (
        <div className="mt-10 flex flex-col gap-3">
          <Link href={ROUTES.SignIn}>
            <Button className="small-medium btn-secondary min-h-10.25 w-full cursor-pointer rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient">Log In</span>
            </Button>
          </Link>
          <Link href={ROUTES.SignUp}>
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-10.25 w-full cursor-pointer rounded-lg border px-4 py-3 shadow-none">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default RightSideBar;
