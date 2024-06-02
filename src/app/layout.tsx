import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eng Blackpill",
  description: "News from the front.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">
            <h1>Eng Blackpill</h1>
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
