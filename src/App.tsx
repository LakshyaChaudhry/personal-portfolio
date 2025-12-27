import HomePage from "./components/HomePage";
import CodingProjects from "./components/CodingProjects";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import Experience from "./components/Experience";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navigation />
      
      <main className="scroll-smooth">
        <section id="homepage">
          <HomePage />
        </section>

        <section id="projects">
          <CodingProjects />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="about">
          <Blog />
        </section>
      </main>
    </div>
  );
}