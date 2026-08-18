import Image from "next/image";
import Link from "next/link";

import { ModeToggle as Theme } from "@/components/navigation/navbar/Theme";
import { auth } from "@/auth";
import MobileNavigation from "./MobileNavigation";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  const image = user?.image;

  return (
    <nav className="background-light900_dark200 shadow-light-300 fixed z-50 flex w-full gap-5 p-6 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <div className="mt-1 flex items-center">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />

          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <Theme />

        {user && (
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9">
              <Image
                src={image ?? "/images/site-logo.svg"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
