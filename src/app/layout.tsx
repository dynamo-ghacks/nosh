import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nosh by Team Dynamo",
  description:
    "Nosh is an online platform for sharing food hypersensitivity-friendly dining spots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black min-h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-md mx-auto bg-white h-screen overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
