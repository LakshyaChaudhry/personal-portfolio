import Hero from "@/components/v2/Hero";
import Work from "@/components/v2/Work";
import About from "@/components/v2/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <div id="about">
        <About />
      </div>
    </>
  );
}
