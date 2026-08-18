import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    // Credentials({
    //   name: "Sign in with credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "you@example.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const email = credentials?.email?.toString();
    //     const password = credentials?.password?.toString();

    //     if (!email || !password) return null;

    //     if (
    //       email.toLowerCase() === "demo@example.com" &&
    //       password === "Password123!"
    //     ) {
    //       return {
    //         id: "demo-user",
    //         name: "Demo User",
    //         email,
    //         image: null,
    //       };
    //     }

    //     return null;
    //   },
    // }),
  ],
});
