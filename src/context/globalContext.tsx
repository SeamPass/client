import React, { createContext, useReducer, useEffect, useState } from "react";
import { globalReducer, initialState, GlobalState } from "./globalReducer";

export const GlobalContext = createContext<GlobalState>(initialState);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const token = sessionStorage.getItem("accessToken");
  console.log(encryptionKey);
  useEffect(() => {
    if (token) {
      handleLogin(token);
    }
  }, [token]);

  const handleLogin = (token: string) => {
    dispatch({
      type: "LOGIN",
      payload: {
        token,
      },
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        auth: state.auth,
        handleLogin,
        setEncryptionKey,
        encryptionKey,
        password,
        setPassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
