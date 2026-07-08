"use server";

import { signIn, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

export async function signInGithubAction() {
  await signIn("github", {
    redirectTo: `${ROUTES.Home}?signin=success`,
  });
}

export async function signInGoogleAction() {
  await signIn("github", {
    redirectTo: `${ROUTES.Home}?signin=success`,
  });
}

export async function logOutAction() {
  await signOut();
}
