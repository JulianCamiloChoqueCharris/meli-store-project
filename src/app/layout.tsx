import "./globals.css";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import UiProviders from "@/components/providers/UiProviders";
import { CategoriesSidebar } from "@/features/categories/components/CategoriesSidebar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Meli Store",
  description:
    "Seller product explorer with categories, pagination and filters",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body className="flex flex-col w-dvw min-h-dvh bg-white text-gray-900 antialiased">
        <UiProviders>
          <Header />
          <div className="flex-1 mx-auto grid w-full max-w-screen-xl grid-cols-1 md:grid-cols-[18rem_1fr]">
            <CategoriesSidebar />
            <main className="min-h-[60dvh] p-4">{children}</main>
          </div>
        </UiProviders>
      </body>
    </html>
  );
}
