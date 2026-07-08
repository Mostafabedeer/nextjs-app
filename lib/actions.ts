"use server";

import { signIn } from "@/auth";
import ROUTES from "@/constants/routes";

export async function signInGithubAction() {
  await signIn("github", {
    redirectTo: `${ROUTES.Home}?signin=success`,
  });
}
