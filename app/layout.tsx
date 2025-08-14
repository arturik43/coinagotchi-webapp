export const metadata = { title: "Coinagotchi", description: "CGT Dashboard" };
import "./globals.css";
import dynamic from "next/dynamic";

// Ganze App-Shell nur clientseitig rendern
const ClientRoot = dynamic(() => import("./ClientRoot"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
