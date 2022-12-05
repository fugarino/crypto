import Header from "../components/navigation/Header";
import Navbar from "../components/navigation/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div className="flex flex-col-reverse sm:flex-row">
          <Navbar />
          <div>
            <Header />
            <main className="h-[calc(100vh-113px)] sm:h-[calc(100vh-56px)] pt-4 px-6 bg-[#f4f4f4]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
