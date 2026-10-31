import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "@/components/navigation/navbar/NavLinks";
import { logOutAction } from "@/lib/actions";

const MobileNavigation = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/icons/hamburger.svg"
          width={30}
          height={30}
          alt="Menu"
          className="invert-colors cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <div className="mt-1 flex items-center">
            <Image
              src="/images/site-logo.svg"
              width={23}
              height={23}
              alt="Logo"
            />

            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Overflow</span>
            </p>
          </div>
        </Link>

        <div className="no-scrollbar mt-5 flex h-full flex-col gap-4 overflow-y-auto">
          <section className="flex h-full flex-col gap-3 pt-4">
            <NavLinks isMobileNav />
          </section>

          <div className="flex flex-col gap-3">
            {user ? (
              <form action={logOutAction}>
                <SheetClose
                  render={
                    <Button
                      type="submit"
                      className="base-medium w-fit cursor-pointer bg-transparent! px-4 py-3"
                    />
                  }
                >
                  <LogOut className="size-5 text-black dark:text-white" />
                  <span className="text-dark300_light900">Logout</span>
                </SheetClose>
              </form>
            ) : (
              <>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={ROUTES.SignIn}
                      className="small-medium btn-secondary min-h-10.25 w-full cursor-pointer rounded-lg px-4 py-3 text-center shadow-none"
                    />
                  }
                >
                  <span className="primary-text-gradient">Log In</span>
                </SheetClose>

                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={ROUTES.SignUp}
                      className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-10.25 w-full cursor-pointer rounded-lg border px-4 py-3 text-center shadow-none"
                    />
                  }
                >
                  Sign Up
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
