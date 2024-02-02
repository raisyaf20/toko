/* eslint-disable @next/next/no-sync-scripts */
import Navbar from "@/components/fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  weight: ["100", "300", "500", "600", "700", "800", "900"],
});

const disabledNavbar = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  return (
    <>
      <SessionProvider session={session}>
        <div className={poppins.className}>
          {!disabledNavbar.includes(router.pathname.split("/")[1]) && (
            <Navbar />
          )}
          <Component {...pageProps} />
        </div>
      </SessionProvider>
      <Script
        src="https://kit.fontawesome.com/7d8ba5a2d6.js"
        crossOrigin="anonymous"
      />
    </>
  );
}
