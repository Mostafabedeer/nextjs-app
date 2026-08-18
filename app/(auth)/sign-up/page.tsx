import AuthForm from "@/components/forms/AuthForm";

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
    />
  );
}

export default SignUp;
