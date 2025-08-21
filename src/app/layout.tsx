import type { Metadata } from "next";

import ReactQueryProvider from "@/providers/react-query-provider";
import CustomThemeProvider from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

import "./globals.css";

import { Inter } from "next/font/google";

import { theme } from "@/themes/theme";

import ToasterContainer from "@/components/ToasterContainer/ToasterContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "سامانه هوشمند انتخاب واحد",
  description: "سامانه هوشمند انتخاب واحد دانشگاه نوشیروانی بابل",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: any;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={"min-h-screen bg-[url('/assets/background.svg')] bg-fixed"}
      >
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <CustomThemeProvider theme={theme}>
              <ToasterContainer />
              {children}
            </CustomThemeProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
