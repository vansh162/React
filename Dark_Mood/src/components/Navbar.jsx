import React from "react";
import "./Navbar.css";
import lightLogo from "../assets/light logo.png";
import darkLogo from "../assets/dark logo.png";
import lightmood from "../assets/light mood.png";
import darkmood from "../assets/dark mood.png";
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
        {/* <img src={theme === 'light' ? logo_light : logo_dark} alt="logo" className='logo' height='80px'/> */}
        <div className="func">
          <ul style={{ color: theme == "light" ? "black" : "white" }}>
            <li>Home</li>
            <li>Products</li>
            <li>Features</li>
            <li>About</li>
          </ul>
        </div>

        <div className="moodImg" onClick={toggle}>
          <img src={theme == "light" ? lightmood : darkmood} alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
