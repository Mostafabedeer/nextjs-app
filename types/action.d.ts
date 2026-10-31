interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image?: string;
  };
}

interface AuthCradentialsParams {
  name: string;
  username: string;
  email: string;
  password: string;
}
