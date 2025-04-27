/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "@/defines/storage";
import { Response } from "@/model";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class Api {
  public caller!: AxiosInstance;

  static instance?: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  constructor() {
    this.init();
    // this.setApiTokenId();
  }

  public setApiTokenId(apiToken?: string) {
    if (apiToken) {
      localStorage.setItem(storage.API_TOKEN, String(apiToken));
    }
    const newApiToken = apiToken
      ? apiToken
      : localStorage.getItem(storage.API_TOKEN);
    if (newApiToken)
      this.caller.defaults.headers.common["x-api-token"] = newApiToken;
  }

  private init() {
    this.caller = axios.create();
    // - Token
    // const token = localStorage.getItem(storage.ACCESS_TOKEN);

    // if (token)
    //   this.caller.defaults.headers.common.Authorization = `Bearer ${token}`;
    // - Config
    this.caller.defaults.baseURL = process.env.API_URL;
    this.caller.defaults.timeout = 1000 * 60 * 5;

    // Response interceptor for API calls
    this.caller.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      },
    );
  }

  public getAuthorizationToken = () =>
    this.caller.defaults.headers.common.Authorization;

  public isAuthorization = () => Boolean(this.getAuthorizationToken());

  public setToken(
    token: string,
    options?: { saveToken?: boolean; pushChannel?: boolean },
  ) {
    if (options?.saveToken) localStorage.setItem(storage.ACCESS_TOKEN, token);
    // eslint-disable-next-line
    if (token)
      this.caller.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public removeToken() {
    localStorage.removeItem(storage.ACCESS_TOKEN);
    // eslint-disable-next-line
    this.caller.defaults.headers.common["Authorization"] = "";
  }

  // > Controller
  private controller: <T = any>(
    handle: () => Promise<AxiosResponse<Response<T>>>,
  ) => Promise<Response<T>> = async (handle) => {
    try {
      const response = await handle();
      return response.data;
    } catch (error) {
      // eslint-disable-next-line
      console.log("Error", (error as any)?.response?.data?.resCode);
      throw error;
    }
  };

  // > Request
  public get<T = any, D = any>(
    url: string,
    apiConfig?: AxiosRequestConfig<D>,
  ): Promise<Response<T>> {
    // eslint-disable-next-line
    console.log("[GET]", url);
    return this.controller(() => this.caller.get(url, apiConfig));
  }

  public delete<T = any, D = any>(
    url: string,
    apiConfig?: AxiosRequestConfig<D>,
  ): Promise<Response<T>> {
    // eslint-disable-next-line
    console.log("[DELETE]", url);
    return this.controller(() => this.caller.delete(url, apiConfig));
  }

  public post<T = any, D = any>(
    url: string,
    data?: D,
    apiConfig?: AxiosRequestConfig<D>,
  ): Promise<Response<T>> {
    // eslint-disable-next-line
    console.log("[POST]", url);
    return this.controller(() => this.caller.post(url, data, apiConfig));
  }

  public put<T = any, D = any>(
    url: string,
    data?: D,
    apiConfig?: AxiosRequestConfig<D>,
  ): Promise<Response<T>> {
    // eslint-disable-next-line
    console.log("[PUT]", url);
    return this.controller(() => this.caller.put(url, data, apiConfig));
  }

  public patch<T = any, D = any>(
    url: string,
    data?: D,
    apiConfig?: AxiosRequestConfig<D>,
  ): Promise<Response<T>> {
    // eslint-disable-next-line
    console.log("[PATCH]", url);
    return this.controller(() => this.caller.patch(url, data, apiConfig));
  }
}

export const api = Api.getInstance();
