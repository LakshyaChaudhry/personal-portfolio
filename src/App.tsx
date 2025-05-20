// This is a simple React component that displays a greeting message.
// It uses Tailwind CSS for styling and is set up to be used with Vite.
// This is also my first react component!

import React from "react";
import HomePage from "./components/HomePage";
import CodingProjects from "./components/CodingProjects";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import "./App.css";
import Experience from "./components/Experience";

export default function App() {
  return (
    <>
    <Navigation />

    <div className="horizontal-scroll-container">
      <div id="homepage">
        <HomePage />
      </div>
      <div id="codingProjects">
        <CodingProjects />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="experience">
        <Experience />
      </div>
      
    </div>
    
    </>
  );

}
