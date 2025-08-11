import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import SidebarCategories from "@/components/SidebarCategories";
import MobileFilters from "@/components/MobileFilters";
import { Roboto } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${roboto.className} min-h-dvh bg-white text-[#030300] antialiased`}
      >
        <PrimeReactProvider value={{ ripple: true, inputStyle: "outlined" }}>
          <Header />
          <MobileFilters />
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr]">
              <aside className="hidden md:block sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto">
                <SidebarCategories />
              </aside>
              <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
            </div>
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
