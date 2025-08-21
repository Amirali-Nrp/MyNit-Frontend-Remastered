import NextAuth from "next-auth"
// import your providers...

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // ...your providers
  ],
  trustHost: true, // <-- important behind proxies / PM2
})
export const { GET, POST } = handlers;
