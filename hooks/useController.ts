/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

type Handle<T = unknown> = () => Promise<T>;

type Options = {
  onLoading?: (value: boolean) => void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  onDone?: () => void;
  notice?: {
    show?: boolean;
    ignoreCodes?: number[];
    fallbackMessage: string;
  };
};

export const useController = () => {
  const controller = async <T = unknown>(
    handle: Handle<T>,
    options?: Options,
  ): Promise<T | undefined> => {
    const {
      notice: noticeOptions,
      onDone,
      onSuccess,
      onError,
      onLoading,
    } = options || {};
    const isShowNotice = noticeOptions?.show;
    let result: T | undefined;
    try {
      if (onLoading) onLoading(true);
      result = await handle();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (onError) onError(error);

      if (error instanceof AxiosError) {
        //   // forbidance => sign out
        //   if (status === 403) {
        //     localStorage.removeItem(storage.ACCESS_TOKEN)
        //     localStorage.removeItem(storage.REFRESH_TOKEN)
        //     localStorage.removeItem(storage.CLIENT_ID)
        //     localStorage.removeItem(storage.ORGANIZATIONS)
        //     api.setToken('')
        //     api.setClientId('')
        //     api.setDeviceId()
        //     dispatch(userActions.clean())
        //     dispatch(appActions.clean())
        //     setTimeout(() => {
        //       navigate(ROUTERS.LOGIN)
        //     }, 100)
        //     return
        //   }
        // }
        if (isShowNotice) {
          return;
        }
      }
      console.log("error");
    } finally {
      onLoading?.(false);
      onDone?.();
    }

    return result;
  };

  return { controller };
};
