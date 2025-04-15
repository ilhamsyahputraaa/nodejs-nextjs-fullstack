"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import AuthProvider from "@/lib/AuthProvider";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
