"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/index";
import { cn } from "@/lib/utils";

const NavLinks = ({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId?: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const route =
          item.route === "/profile"
            ? userId
              ? `${item.route}/${userId}`
              : null
            : item.route;

        if (!route) return null;

        const isActive =
          pathname === route ||
          (route.length > 1 && pathname.startsWith(`${route}/`));

        const LinkComponent = (
          <Link
            href={route}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient text-light-900 inline-block rounded-lg"
                : "text-dark300_light900 text-light-900",
              "mx-2 flex items-center justify-start gap-2 bg-transparent py-4 pl-2",
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive
                  ? "base-bold text-dark300_light900 text-sm sm:text-xs md:text-sm"
                  : "base-medium text-dark300_light900 text-sm sm:text-xs md:text-sm",
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose
            key={route}
            nativeButton={false}
            render={LinkComponent}
          />
        ) : (
          <React.Fragment key={route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
