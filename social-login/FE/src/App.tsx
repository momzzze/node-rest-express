import { useState } from "react";
import "./App.css";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import AuthModal from "./components/auth";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<string | null>(null);

  const handleOnAuthClick = (type: string) => {
    setAuthType(type); // "login" или "register"
  };
  console.log("authType:", authType);

  return (
    <>
      <Header onAuthClick={handleOnAuthClick} />
      <main>
        <Outlet />
      </main>
      <Footer />
      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(false)} />
      )}
    </>
  );
}

export default App;
