import { loginWithGoogle, signIn } from "@/lib/firebase/serviceFirebase";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authoption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const pwConfirm = await compare(password, user.password);
          if (pwConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: (process.env.NEXT_GOOGLE_OAUTH_CLIENT_ID as string) || "",
      clientSecret:
        (process.env.NEXT_GOOGLE_OAUTH_CLIENT_SECRET as string) || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.fullname;
        token.phone = user.phone;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          type: "google",
        };
        await loginWithGoogle(data, (user: any) => {
          token.email = user.email;
          token.fullname = user.name;
          token.role = user.role;
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authoption);
