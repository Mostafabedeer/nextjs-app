import HotNetwork from "@/components/HotNetwork";
import Navbar from "@/components/navigation/navbar/Navbar";
import PopularTags from "@/components/PopularTags";
import LeftSideBar from "@/components/navigation/navbar/LeftSideBar";

import { Toaster } from "sonner";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full sm:grid sm:grid-cols-8 sm:grid-rows-[repeat(5,max-content)] sm:gap-3">
      <aside className="hidden sm:col-span-2 sm:col-start-1 sm:row-span-5 sm:row-start-1 sm:block lg:col-span-1">
        <LeftSideBar />
      </aside>
      <Navbar />
      <div className="col-span-7 col-start-3 row-start-2 mx-2 sm:mx-0 lg:col-span-5 lg:row-span-4">
        {children}
      </div>
      <HotNetwork />
      <PopularTags />
      <Toaster />
    </main>
  );
}

export default RootLayout;
