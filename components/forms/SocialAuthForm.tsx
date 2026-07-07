import SignInGithubForm from "./SignInGithubForm";
import SignInGoogleForm from "./SignInGoogleForm";

function SocialAuthForm() {
  return (
    <>
      <div className="mt-5 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:gap-4">
        <SignInGithubForm />
        <SignInGoogleForm />
      </div>
    </>
  );
}

export default SocialAuthForm;
