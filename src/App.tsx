// This is a simple React component that displays a greeting message.
// It uses Tailwind CSS for styling and is set up to be used with Vite.
// This is also my first react component!

import Hero3D from "./components/Hero3D";
import "./App.css";

export default function App() {
  return (
    <div className="my-background">
      { <Hero3D /> }
    </div>
  );

}
