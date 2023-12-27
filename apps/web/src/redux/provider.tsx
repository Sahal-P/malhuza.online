import React from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";
import {Toaster} from 'sonner'

interface Props {
  children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
  return (
    <Provider store={makeStore()}>
      <Toaster position="bottom-center" />
      {children}
    </Provider>
  );
}
