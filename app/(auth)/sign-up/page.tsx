import AuthForm from "@/components/forms/AuthForm";
import { SignUpWithCradentialsAction } from "@/lib/actions/auth.action";

function SignUp() {
  return (
    <AuthForm
      formType="SIGN_UP"
      defaultValues={{
        username: "",
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={SignUpWithCradentialsAction}
    />
  );
}

export default SignUp;
