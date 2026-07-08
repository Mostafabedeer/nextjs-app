import Image from "next/image";
import Link from "next/link";

import { ModeToggle as Theme } from "@/components/navigation/navbar/Theme";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogoutSquare01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { logOutAction } from "@/lib/actions";

const Navbar = async () => {
  const session = await auth();
  const user = (
    session as { user?: { name?: string | null; email?: string | null } } | null
  )?.user;
  console.log("user", user);
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="Dev Overflow Logo"
        />

        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <p className="text-muted-foreground text-center text-lg">search bar</p>
      <Theme />
      {user && (
        <div className="flex items-center gap-2">
          <p className="text-dark-100 dark:text-light-900">
            {user.name || user.email}
          </p>
          <form action={logOutAction}>
            <Button type="submit" variant="outline" className="cursor-pointer">
              <HugeiconsIcon icon={LogoutSquare01Icon} />
            </Button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
