import React from "react";

const Footer = ({ theme }) => {
  return (
    <div
      className="main"
      style={{
        backgroundColor: theme == "light" ? "white" : "red",
        color: theme == "light" ? "black" : "white",
      }}
    >
      <div class="footer">Made with &hearts; by Vansh Thakkar</div>
    </div>
  );
};

export default Footer;
