"use client";
import {
  DefaultValues,
  FieldValues,
  Path,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";
import { Button } from "../ui/button";
import SocialAuthForm from "./SocialAuthForm";
import Link from "next/link";
import { SignInSchema, SignUpSchema } from "@/lib/validations";

interface AuthFormProps<T extends FieldValues> {
  formType: "SIGN_IN" | "SIGN_UP";
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
}

function AuthForm<T extends FieldValues>({
  formType,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) {
  const router = useRouter();
  const schema = formType === "SIGN_UP" ? SignUpSchema : SignInSchema;

  const form = useForm<T>({
    resolver: zodResolver(schema as unknown as ZodType<T, T>) as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast("Success", {
        description: `You have successfully ${formType === "SIGN_UP" ? "signed up" : "signed in"}.`,
      });

      router.push(ROUTES.Home);
    } else {
      toast(`Error ${result?.status}`, {
        description: result?.error?.message,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2"
      >
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

            const fieldErrors =
              form.formState.errors[
                fieldName as keyof typeof form.formState.errors
              ];

            return (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={id} className="label">
                  {label}
                </label>
                <input
                  {...form.register(fieldName as Path<T>)}
                  defaultValue={defaultValues[key]}
                  type={type}
                  id={id}
                  name={id}
                  className={`input ${fieldErrors ? "border-red-500" : ""}`}
                  placeholder={label}
                  disabled={form.formState.isSubmitting}
                />
                <p className="min-h-5 text-xs text-red-500 md:text-sm">
                  {typeof fieldErrors?.message === "string"
                    ? fieldErrors.message
                    : ""}
                </p>
              </div>
            );
          })}
          <Button
            type="submit"
            className={`primary-gradient text-light-900 mt-4 w-full cursor-pointer p-4 text-sm md:mt-5 md:p-5 md:text-xl ${form.formState.isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {form.formState.isSubmitting
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
