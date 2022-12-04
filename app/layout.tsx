import Header from "../components/navigation/Header";
import Navbar from "../components/navigation/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div className="flex h-screen w-screen bg-[#F4F4F4]">
          <Navbar />
          <div className="w-[calc(100%-4rem)]">
            <Header />
            <main className="mx-8 my-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
