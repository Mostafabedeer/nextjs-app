import Navbar from "@/components/navigation/navbar/Navbar";
import { Toaster } from "sonner";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <Toaster />
      {children}
    </main>
  );
}

export default RootLayout;
