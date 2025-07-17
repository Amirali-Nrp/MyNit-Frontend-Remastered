import NextAuth from "next-auth";

declare module "@auth/core/types" {
  interface User {
    token: string;
    isAdmin: boolean;
  }

  interface Session {
    user: {
      token: string;
      isAdmin: boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    token: string;
    isAmin: boolean;
  }
}
