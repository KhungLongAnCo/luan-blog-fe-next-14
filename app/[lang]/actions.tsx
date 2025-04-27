export const checkSessionExisted = () => {
  // const isSessionExisted = Boolean(cookies().get('session')?.value)
  // return isSessionExisted
};

export const guardPublicRoute = () => {
  // const isSessionExisted = cookies().get('session')?.value
  // if (isSessionExisted) {
  //   return redirect(`/notes`)
  // }
};

export const guardPrivateRoute = () => {
  // const isSessionExisted = cookies().get('session')?.value
  // if (!isSessionExisted) {
  //   return redirect(`/login`)
  // }
};

export const checkSessionRedirect = () => {
  // const isSessionExisted = cookies().get('session')?.value
  // if (!isSessionExisted) {
  //   return redirect(`/login`)
  // } else {
  //   return redirect(`/notes`)
  // }
};
