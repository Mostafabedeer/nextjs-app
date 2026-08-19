import HotNetwork from "@/components/HotNetwork";
import Navbar from "@/components/navigation/navbar/Navbar";
import PopularTags from "@/components/PopularTags";
import LeftSideBar from "@/components/navigation/navbar/LeftSideBar";

import { Toaster } from "sonner";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="sm:grid sm:grid-cols-10 sm:grid-rows-9 sm:gap-2">
      <aside className="hidden sm:col-span-2 sm:row-span-9 sm:block">
        <LeftSideBar />
      </aside>
      <Navbar />

      {children}
      <HotNetwork />
      <PopularTags />
      <Toaster />
    </main>
  );
}

export default RootLayout;
