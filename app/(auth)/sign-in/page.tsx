import { SignInWithCradentialsAction } from "@/lib/actions/auth.action";
import AuthForm from "../../../components/forms/AuthForm";

export default function SignIn() {
  return (
    <AuthForm
      formType="SIGN_IN"
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={SignInWithCradentialsAction}
    />
  );
}
