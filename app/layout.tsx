import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/context/UserContext";
import Nav from "@/components/Nav";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcade Vault",
  description: "The ultimate online gaming platform. Compete for the highest scores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <UserContextProvider>
          <Nav />
          <main className="av-main">{children}</main>
          <footer style={{ borderTop: "1px solid var(--line)", padding: "20px 32px", textAlign: "center", color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em" }}>
            © 2026 ARCADE VAULT · HECHO CON PIXELES Y NEÓN · v2.6.0
          </footer>
        </UserContextProvider>
      </body>
    </html>
  );
}
