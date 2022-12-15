import { AuthProvider } from "../../contexts/AuthContext";
import Header from "../components/navigation/header/Header";
import Navbar from "../components/navigation/navbar/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <AuthProvider>
          <div className="flex flex-col-reverse sm:flex-row">
            <Navbar />
            <div>
              <Header />
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
