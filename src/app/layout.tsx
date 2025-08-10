export const metadata = {
  title: "Meli Store",
  description:
    "Seller product explorer with categories, pagination and filters",
};

import "./globals.css";
import { PrimeReactProvider } from "primereact/api";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        <PrimeReactProvider>
          <div className="mx-auto max-w-screen-lg p-4">{children}</div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
