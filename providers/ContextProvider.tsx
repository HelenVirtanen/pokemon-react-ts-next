"use client";

import { GlobalContextProvider } from "../context/globalContext";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}

export default ContextProvider;
