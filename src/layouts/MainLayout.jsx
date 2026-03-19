import loadingGif from "@/assets/images/loading.gif";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useLoading } from "@/hooks/useLoading";
import { Outlet } from "react-router";

export default function MainLayout() {
  const { loading } = useLoading();
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#DBE4E9] relative">
      <div className="w-full max-w-[1000px]">
        <Header />
        <Navbar />
        <main className="my-2 sm:my-3.75 px-1 sm:px-0">
          <Outlet />
        </main>
        <Footer />
      </div>

      {loading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center">
          <img src={loadingGif} alt="" className="size-28 sm:size-32" />
        </div>
      )}
    </div>
  );
}
