"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AuthToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const signin = searchParams.get("signin");

    if (signin === "success") {
      toast.success("Signed in successfully!", {
        position: "top-center",
      });

      // Remove the query parameter so it won't appear again
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  return null;
}
