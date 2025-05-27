import HomePage from "./components/HomePage";
import CodingProjects from "./components/CodingProjects";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import Experience from "./components/Experience";

export default function App() {
  return (
    <>
      <Navigation />

      {/* horizontal carousel */}
      <div
        data-hide-scrollbar                /* hides WebKit track */
        className="
          flex overflow-x-auto
          snap-x snap-mandatory
          h-screen w-screen scroll-smooth
          [scrollbar-width:none]           /* hides Firefox track */
        "
      >
        <section id="homepage"   className="flex-none w-screen h-screen snap-start">
          <HomePage />
        </section>

        <section id="codingProjects" className="flex-none w-screen h-screen snap-start">
          <CodingProjects />   {/* already wrapped with w-screen/h-screen/snap-start */}
        </section>

        <section id="experience" className="flex-none w-screen h-screen snap-start">
          <Experience />
        </section>

        <section id="blog"       className="flex-none w-screen h-screen snap-start">
          <Blog />
        </section>
      </div>
    </>
  );
}
