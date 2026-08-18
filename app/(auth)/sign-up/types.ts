import { SignUpSchema } from "@/lib/validations";
import { z } from "zod";

export type SignUpFormData = z.infer<typeof SignUpSchema>;
