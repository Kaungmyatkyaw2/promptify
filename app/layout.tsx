import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Promptify",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={null}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
