import React from "react";

const Footer = () => (
  <footer className="bg-gray-800">
    <div className="mx-auto p-2 text-white w-3/5">
      <span className="text-xs">©{new Date().getFullYear()} - Tinnies</span>
    </div>
  </footer>
);

export default Footer;
