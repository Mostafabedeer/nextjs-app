import { SignInSchema } from "@/lib/validations";
import { z } from "zod";

export type SignInFormData = z.infer<typeof SignInSchema>;
