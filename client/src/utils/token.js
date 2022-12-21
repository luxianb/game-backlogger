const ACCESS_TOKEN = "access_token";

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
export const destroyToken = () => localStorage.removeItem(ACCESS_TOKEN);
