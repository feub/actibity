import Footer from "../ui/footer";
import Header from "../ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main className="row-start-2 bg-zinc-900">{children}</main>
      <Footer />
    </div>
  );
}
