import Layout from "./components/Layout";
import Hero from "./components/v2/Hero";
import Work from "./components/v2/Work";
import About from "./components/v2/About";

export default function App() {
  return (
    <Layout>
      <Hero />
      <Work />
      <div id="about">
        <About />
      </div>
    </Layout>
  );
}