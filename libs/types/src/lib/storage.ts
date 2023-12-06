export const setCookie = (name: string, value: any, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieValue;
};

export function getCookie(name: string) {
  if (window.document) {
    const cookie = window.document.cookie
      .split(';')
      .filter((item) => item.indexOf(`${name}=`) >= 0);
    if (cookie && cookie.length > 0) {
      const val = cookie[0];
      return val.substring(val.indexOf('=') + 1);
    }
    return undefined;
  }
  return undefined;
}

export function setItemToStorage(name: string, value: string) {
  if (typeof Storage !== 'undefined') {
    return localStorage.setItem(name, value);
  } else {
    // do nothing
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
