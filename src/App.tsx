// This is a simple React component that displays a greeting message.
// It uses Tailwind CSS for styling and is set up to be used with Vite.
// This is also my first react component!

import Hero3D from "./components/Hero3D";
import React from "react";
import "./App.css";



export default function App() {
  return (
    <>
    <div className="my-background">
      { <Hero3D /> }
    </div>

    <div className="horizontal-scroll-container">
      <div className="page-section">
        <h1> Welcome Page </h1>
        <p>This is the first section of my portfolio</p>
      </div>

      <div className="page-section">
        <h1> Coding Projects </h1>
        <p>This is a showcase of my coding work</p>
      </div>

      <div className="page-section">
        <h1> Blog </h1>
        <p>This is a collection of my blog posts</p>
      </div>
    </div>
    </>
  );

}
