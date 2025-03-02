import React from "react";
import "./Navbar.css";
import lightLogo from "../assets/light logo.png";
import darkLogo from "../assets/dark logo.png";
import lightmode from "../assets/light mode.png";
import darkmode from "../assets/dark mode.png";
import { useState } from "react";

const Navbar = ({ theme, setTheme }) => {
  const toggle = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <>
      <div
        className="navbar"
        style={{ backgroundColor: theme == "light" ? "white" : "red" }}
      >
        <img
          className="logo"
          src={theme == "light" ? lightLogo : darkLogo}
          alt=""
        />
        <div className="func">
          <ul style={{ color: theme == "light" ? "black" : "white" }}>
            <li>Home</li>
            <li>Products</li>
            <li>Features</li>
            <li>About</li>
          </ul>
        </div>

        <div className="modeImg" onClick={toggle}>
          <img src={theme == "light" ? lightmode : darkmode} alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
