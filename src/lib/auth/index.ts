import { login } from "@/core/services/api";
import { signInInputSchema } from "@/validation/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "../../../auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signInInputSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          try {
            const result = await login(parsedCredentials.data);

            // if (!result || !result["access token"] || result.admin == null) {
            //   return null;
            // }

            if (result && result["access token"] && result.admin != null) {
              return {
                token: result["access token"],
                isAdmin: result.admin,
              };
            }

            return null;
          } catch (e) {
            console.log(e);
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          token: user.token,
          isAmin: user.isAdmin,
        };
      }

      return { ...token };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          token: token.token,
          isAdmin: token.isAmin,
        },
      };
    },
  },
});
