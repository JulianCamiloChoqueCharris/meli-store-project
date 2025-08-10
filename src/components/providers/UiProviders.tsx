"use client";

import { PrimeReactProvider } from "primereact/api";
import { ReactNode } from "react";

export default function UiProviders({ children }: { children: ReactNode }) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
