import HotNetwork from "@/components/HotNetwork";
import Navbar from "@/components/navigation/navbar/Navbar";
import PopularTags from "@/components/PopularTags";
import LeftSideBar from "@/components/navigation/navbar/LeftSideBar";

import { Toaster } from "sonner";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen sm:grid sm:grid-cols-8 sm:grid-rows-[auto_1fr_1fr_1fr_1fr] sm:gap-3">
      <aside className="hidden sm:col-span-2 sm:col-start-1 sm:row-span-5 sm:row-start-1 sm:block lg:col-span-1">
        <LeftSideBar />
      </aside>
      <Navbar />
      <div className="col-span-7 col-start-3 row-start-2 mx-1 mt-5 ml-1 overflow-y-scroll sm:mx-0 sm:ml-9 md:row-span-4 lg:col-span-5">
        {children}
      </div>
      <HotNetwork />
      <PopularTags />
      <Toaster />
    </main>
  );
}

export default RootLayout;
