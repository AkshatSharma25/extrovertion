import "./globals.css";
import Navbar from "../components/Navbar";
import SessionWrapper from "./SessionWrapper";
export const metadata = {
  title: "Extrovertion",
  description: "The Next Social Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="bg-gray-100 max-w-[100vw]">
        <SessionWrapper>
          
          {children}
          </SessionWrapper>
      </body>
    </html>
  );
}
