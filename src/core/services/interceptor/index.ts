// "use server";

import { parsedEnv } from "@/core/config/env.config.mjs";
import axios, { type AxiosError, type AxiosResponse } from "axios";

import { auth } from "@/lib/auth";

const instance = axios.create({
  baseURL: parsedEnv.API_URL,
});

const onSuccess = (response: AxiosResponse) => {
  return response;
};

const onError = (error: AxiosError) => {
  const status = error.response ? error.response.status : null;

  switch (status) {
    case 400:
      console.log(error);
      return Promise.reject({
        fa: "درخواست شما معتبر نیست. لطفاً دوباره تلاش کنید.",
        en: "Your request is invalid. Please try again.",
      });
    case 401:
      return Promise.reject({
        fa: "ابتدا باید وارد سایت شوید.",
        en: "You must first login.",
      });
    case 403:
      return Promise.reject({
        fa: "شما به این بخش دسترسی ندارید.",
        en: "You do not have access to this section.",
      });
    case 404:
      return Promise.reject({
        fa: "موردی یافت نشد.",
        en: "Not found.",
      });
    case 500:
      console.error("server Error in interceptor");
      console.error("Full Error: ", error);
      return Promise.reject({
        fa: "خطایی رخ داده است.",
        en: "An error has occurred.",
      });
    default:
      console.error("Unrecognized Error in interceptor");
      console.error("Full Error: ", error);

      return Promise.reject({
        fa: "خطایی رخ داده است.",
        en: "An error has occurred.",
      });
  }
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use(
  async (config) => {
    const session = await auth();
    const token = session?.user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("error in interceptor request", error);

    return Promise.reject(error);
  }
);

export default instance;
