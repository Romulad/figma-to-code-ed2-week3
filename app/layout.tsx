import type { Metadata } from "next";
import "@/ui/globals.css";
import Script from "next/script";

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
    <html lang="en" className="dark">
      <body>
        <Script id="switch-theme" strategy="beforeInteractive">
          { `
          const documtElement = document.querySelector("html");
          const currentTheme = localStorage.getItem("theme");
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;    

          if(
              currentTheme && 
              (currentTheme === "light" || currentTheme === "dark")
          ){
              currentTheme === "dark" ? 
              documtElement?.classList.add("dark") :
              documtElement?.classList.remove("dark");
          }else if(prefersDark){
              documtElement?.classList.add('dark');
          }else if(prefersLight){
              documtElement?.classList.remove('dark');
          }else{
              documtElement?.classList.remove('dark');
          }` }
        </Script>
        { children }
      </body>
    </html>
  );
}