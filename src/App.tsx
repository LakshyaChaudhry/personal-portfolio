import HomePage from "./components/HomePage";
import CodingProjects from "./components/CodingProjects";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import Experience from "./components/Experience";
import ScrollHint from "./components/ScrollHint"; // Add this component

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
        style={{
          WebkitOverflowScrolling: 'touch' /* iOS smooth scrolling */
        }}
      >
        <section id="homepage" className="flex-none w-screen h-screen snap-start overflow-hidden">
          <HomePage />
          <ScrollHint />
        </section>

        <section id="codingProjects" className="flex-none w-screen h-screen snap-start overflow-y-auto">
          <CodingProjects />
        </section>

        <section id="experience" className="flex-none w-screen h-screen snap-start overflow-y-auto">
          <Experience />
        </section>

        <section id="blog" className="flex-none w-screen h-screen snap-start overflow-y-auto">
          <Blog />
        </section>
      </div>
    </>
  );
}