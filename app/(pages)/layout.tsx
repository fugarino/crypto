import Image from "next/image";
import Link from "next/link";
import { AuthProvider } from "../../contexts/AuthContext";
import { FavoriteCoinsProvider } from "../../contexts/FavoritesContext";
import Profile from "../components/auth/Profile";
import Menu from "../components/navigation/navbar/menu/Menu";
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
          {/* <div className="flex bg-[#edebe9]">
            <Navbar />
            <main className="w-full max-w-[1400px] mx-auto px-12 pb-6">
              <Profile />
              {children}
            </main>
          </div> */}
          <div className="min-h-screen bg-[#edebe9] w-screen">
            <nav className="flex items-center max-w-[1400px] mx-auto justify-between px-12 h-20">
              <div className="flex">
                <Link href="/">
                  <div className="flex items-center justify-center">
                    <Image src="/L.svg" height={20} width={20} alt="logo" />
                  </div>
                </Link>
                <Menu />
              </div>
              <div className="relative top-[5px]">
                <Profile />
              </div>
            </nav>
            <FavoriteCoinsProvider>
              <main className="w-full">{children}</main>
            </FavoriteCoinsProvider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
