import { Auth, Storages, Users } from '@intern-place/types';
import { sha256 } from 'js-sha256';
import { Dispatch, SetStateAction } from 'react';

export const USER_STORAGE_KEY = 'user';
export const LOGGEDIN_COOKIE_KEY = 'loggedin';

export async function login(
  req: Auth.LoginReq,
  authCtx: Auth.AuthContextProps
) {
  const authResp = await Auth.auth({
    Username: req.Username,
    Password: req.Password ? sha256(req.Password) : '',
  });

  if (authResp.error) {
    removeAllCookies();
    removeStorage(['user']);
  } else {
    onLoginSuccess(authCtx, authResp);
  }
}

export function checkLogin(
  setAuthenticated: Dispatch<SetStateAction<boolean>>,
  setUser: Dispatch<SetStateAction<Users.User | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  let usr: Users.User | undefined;
  const hasToken =
    Storages.getCookie(LOGGEDIN_COOKIE_KEY) !== undefined &&
    Storages.getCookie(LOGGEDIN_COOKIE_KEY) === 'true';
  let hasUserProfile = false;
  try {
    const item = getItemFromStorage(USER_STORAGE_KEY);
    if (item) {
      const userProfile = JSON.parse(item);
      usr = userProfile;
      hasUserProfile =
        userProfile !== null && userProfile !== '' && userProfile.ID;
    }
  } catch (Exception) {
    // do nothing
  }

  setAuthenticated(!!hasToken && !!hasUserProfile);
  if (hasToken && hasUserProfile) {
    setUser(usr);
  }

  setLoading(false);
}

export function onLoginSuccess(
  authCtx: Auth.AuthContextProps,
  user?: Users.User
) {
  const necessaryFields = {
    ID: user?.ID,
    UserName: user?.UserName,
    RoleID: user?.RoleID,
    FirstName: user?.FirstName,
    LastName: user?.LastName,
  };

  Storages.setItemToStorage(USER_STORAGE_KEY, JSON.stringify(necessaryFields));
  authCtx.setUser(user);
  authCtx.setAuthenticated(true);
  return user;
}

export function getItemFromStorage(name: string) {
  if (typeof Storage !== 'undefined') {
    const item = localStorage.getItem(name);
    if (!item) {
      return undefined;
    }
    return item;
  } else {
    return undefined;
  }
}

export function removeAllCookies() {
  const cookies = window.document.cookie.split(';');

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    window.document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }
}

export function removeStorage(names: string[]) {
  names.map((val: string) => {
    if (typeof Storage !== 'undefined') {
      return localStorage.removeItem(val);
    } else {
      // Sorry! No Web Storage support..
    }
  });
}
