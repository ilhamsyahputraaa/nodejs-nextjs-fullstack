"use client";

import { Provider } from "react-redux";
import { store,persistor } from "@/store";
import AuthProvider from "@/lib/AuthProvider";
import { PersistGate } from "redux-persist/integration/react";

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
