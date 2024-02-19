"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function NextUIThemeProvider({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
