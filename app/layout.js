import "./globals.css";
import Navbar from "../components/Navbar";
export const metadata = {
  title: "Extrovertion",
  description: "The Next Social Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="bg-gray-100 max-w-[100vw]">
        
          
          {children}
        
      </body>
    </html>
  );
}
