import { useState, useCallback, useEffect } from "react";

// here we need to ensure that we log the user out automatically if the token expired(logoutTimer)
let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  // here in loq in func we expect token (also in Auth.js in log in & sign up mode we send the token )
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    // to take in account the expiration of the token which is one hour
    // and will be stored in userData as well (with userId & token)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    // here we store the token so keep logged in when we reload the page
    // in the browser => application => local storage we will find our token(look like object but it's just a string)
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    // here we need to clear the storage when we log out(so in logout mode when we reload we still logged out )
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // here we use useEffect to log in automatically when we render the webpage first time
  // we take advantage of store the data in local storage
  // and we send the user id with the token which where stored in local storage

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
