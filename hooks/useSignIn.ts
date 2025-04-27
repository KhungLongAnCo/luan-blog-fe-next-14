import { api } from "@/apis/config";
import { ROUTERS } from "@/defines";
import { storage } from "@/defines/storage";
import { useState } from "react";
import { useController } from "./useController";
import { LoginBodyDto } from "@/model";
import { redirect } from "next/navigation";
import { UserApi } from "@/apis/user";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { controller } = useController();

  const doLogin = async (params: { accessToken: string }) => {
    controller(
      async () => {
        const { accessToken } = params;
        setLoading(true);
        localStorage.setItem(storage.ACCESS_TOKEN, String(accessToken));
        api.setToken(accessToken);
        redirect(ROUTERS.HOME);
      },
      {
        onDone: () => setLoading(false),
      },
    );
  };

  const handleLogin = async (params: LoginBodyDto) => {
    controller(
      async () => {
        setLoading(true);
        const res = await UserApi.doLoginRequest(params);
        doLogin({
          accessToken: res?.data?.accessToken,
        });
      },
      {
        onDone: () => setLoading(false),
        onError: (error) => {
          console.log(error || "");
        },
      },
    );
  };

  return { handleLogin, doLogin, loading };
};
