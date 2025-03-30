import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthListener } from "./listeners/AuthListener";
import { ClientProvider } from "@/state/ClientProvider";
import { ExpensesListener } from "./listeners/ExpensesListener";
import { IncomesListener } from "./listeners/IncomesListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Seize control of your personal finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProvider>
          <AuthListener>
            <IncomesListener>
              <ExpensesListener>
                {children}
              </ExpensesListener>
            </IncomesListener>
          </AuthListener>
        </ClientProvider>
      </body>
    </html>
  );
}
