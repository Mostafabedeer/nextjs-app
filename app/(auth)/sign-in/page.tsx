import AuthForm from "../../../components/forms/AuthForm";

export default function SignIn() {
  return (
    <AuthForm
      formType="SIGN_IN"
      defaultValues={{
        email: "",
        password: "",
      }}
    />
  );
}
