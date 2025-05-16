// This is a simple React component that displays a greeting message.
// It uses Tailwind CSS for styling and is set up to be used with Vite.
// This is also my first react component!

import React from "react";
import HomePage from "./components/HomePage";
import CodingProjects from "./components/CodingProjects";
import Blog from "./components/Blog";
import "./App.css";




export default function App() {
  return (
    <>
    <div className="horizontal-scroll-container">
      <HomePage />

      <CodingProjects />

      <Blog />
    </div>
    
    </>
  );

}
