import { LoginBodyDto } from "@/model";
import { Api, api } from "./config";

class User {
  instance: Api;

  constructor(params: Api) {
    this.instance = params;
  }

  public doLoginRequest = (payload: LoginBodyDto) => {
    return this.instance.post("/auth/login", payload);
  };

  // public doLogoutRequest = (body: LogoutBodyDto) => {
  //   return this.instance.post("/auth/logout", body);
  // };
}

export const UserApi = new User(api);
