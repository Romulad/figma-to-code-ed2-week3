import type { Metadata } from "next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: {
    template: "Tokena - %s",
    default: "Tokena"
  },
  authors: [{name: "Romuald oluwatobi", url: "https://www.linkedin.com/in/romuald-oluwatobi"}],
  creator: "Romuald oluwatobi",
};

export default function RootLayout({ children } : Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}