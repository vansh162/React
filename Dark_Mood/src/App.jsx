import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "./components/Footer";

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <Section theme={theme} />
      <Footer theme={theme} />
    </>
  );
};

export default App;
