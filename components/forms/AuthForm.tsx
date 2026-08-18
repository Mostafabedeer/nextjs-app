"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import SocialAuthForm from "./SocialAuthForm";
import { SignInSchema, SignUpSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignInFormData } from "@/app/(auth)/sign-in/types";
import type { SignUpFormData } from "@/app/(auth)/sign-up/types";
import { useState } from "react";
import {
  signInCredentialsAction,
  signUpCredentialsAction,
} from "@/lib/actions";

function AuthForm({
  formType,
  defaultValues,
}: {
  formType: "SIGN_IN" | "SIGN_UP";
  defaultValues: Record<string, string>;
}) {
  const schema = formType === "SIGN_UP" ? SignUpSchema : SignInSchema;

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async function (data: SignInFormData | SignUpFormData) {
    setIsLoading(true);
    if (formType === "SIGN_IN")
      await signInCredentialsAction(data as SignInFormData);
    if (formType === "SIGN_UP")
      await signUpCredentialsAction(data as SignUpFormData);
    reset();

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {Object.keys(defaultValues).map((key) => {
            const id = key;
            const fieldName = id as "email" | "password" | "username" | "name";
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            const type = key.toLowerCase().includes("password")
              ? "password"
              : key.toLowerCase().includes("email")
                ? "email"
                : "text";

            const fieldErrors = errors[fieldName as keyof typeof errors];

            return (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={id} className="label">
                  {label}
                </label>
                <input
                  {...register(fieldName)}
                  defaultValue={defaultValues[key]}
                  type={type}
                  id={id}
                  name={id}
                  className={`input ${fieldErrors ? "border-red-500" : ""}`}
                  placeholder={label}
                  disabled={isLoading}
                />
                <p className="min-h-5 text-xs text-red-500 md:text-sm">
                  {fieldErrors ? fieldErrors.message : ""}
                </p>
              </div>
            );
          })}
          <Button
            type="submit"
            className="primary-gradient text-light-900 mt-4 w-full cursor-pointer p-4 text-sm md:mt-5 md:p-5 md:text-xl"
          >
            {isLoading
              ? "Loading..."
              : formType === "SIGN_UP"
                ? "Sign Up"
                : "Sign In"}
          </Button>
        </div>
      </form>
      {formType === "SIGN_IN" ? <SocialAuthForm /> : null}
      <p className="text-dark400_light700 mt-3 text-sm md:mt-6 md:text-base">
        {formType === "SIGN_UP" ? "Already have an account?" : "No account?"}

        <Link
          className="primary-text-gradient ml-2"
          href={formType === "SIGN_UP" ? "/sign-in" : "/sign-up"}
        >
          {formType === "SIGN_UP" ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </>
  );
}

export default AuthForm;
