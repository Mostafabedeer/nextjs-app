import AuthToast from "@/components/authtoast/AuthToast";

async function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
      Home
      <AuthToast />
    </main>
  );
}

export default Home;
