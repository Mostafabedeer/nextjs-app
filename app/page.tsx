function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="font-space-grotesk text-dark-200 text-3xl leading-tight font-semibold break-words sm:text-4xl">
          This text will wrap on smaller screens so it stays readable when the
          window is resized.
        </h1>
        <p className="text-dark-400 mt-4 max-w-full text-base leading-7 break-words sm:text-lg">
          Use a fluid container plus wrap-friendly classes like break-words and
          whitespace-normal on the text element. That lets long headings and
          sentences break naturally instead of overflowing off the screen.
        </p>
      </div>
    </main>
  );
}

export default Home;
