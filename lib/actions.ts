"use server";

import { SignInFormData } from "@/app/(auth)/sign-in/types";
import { SignUpFormData } from "@/app/(auth)/sign-up/types";
import { signIn, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

export async function signInGithubAction() {
  await signIn("github", {
    redirectTo: `${ROUTES.Home}?signin=success`,
  });
}

export async function signInGoogleAction() {
  await signIn("google", {
    redirectTo: `${ROUTES.Home}?signin=success`,
  });
}

export async function logOutAction() {
  await signOut({
    redirectTo: `${ROUTES.Home}?signout=success`,
  });
}

export async function signInCredentialsAction(data: SignInFormData) {
  console.log(data);
}

export async function signUpCredentialsAction(data: SignInFormData) {
  console.log(data);
}
