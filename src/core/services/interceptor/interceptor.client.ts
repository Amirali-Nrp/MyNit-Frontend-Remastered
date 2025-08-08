// interceptor.client.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // public URL
});

client.interceptors.request.use(
  async (config) => {
    // getSession() reads your NextAuth cookie in the browser
    const session = await getSession();

    // if you’ve stored a JWT on session.user.token
    if (session?.user?.token) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
