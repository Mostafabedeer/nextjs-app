import Image from "next/image";
import Link from "next/link";

import { ModeToggle as Theme } from "@/components/navigation/navbar/Theme";
import { auth } from "@/auth";
import MobileNavigation from "./MobileNavigation";
import UserAvatar from "@/components/UserAvatar";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="background-light900_dark200 shadow-light-300 col-span-7 flex h-fit w-full gap-5 p-6 sm:px-12 lg:col-start-2 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1 sm:hidden">
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

      <div className="ml-auto flex items-center gap-4">
        <Theme />

        {user && (
          <UserAvatar userId={user.id} imgUrl={user.image} name={user.name} />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
