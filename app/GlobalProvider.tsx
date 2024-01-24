"use client";
import { store } from "@/globalStore/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
};

export default GlobalProvider;
