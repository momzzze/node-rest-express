import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Footer from "./footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="app">
          <h1>
            <img src={reactLogo} alt="React Logo" />
            <img src={viteLogo} alt="Vite Logo" />
            Hello Vite + React!
          </h1>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <button
              className="link"
              onClick={() => {
                window.open("https://vitejs.dev/guide/features.html", "_blank");
              }}
            >
              Vite Documentation
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
