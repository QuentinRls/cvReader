import React from "react";
import "./loader.css";

const Loader = () => {
  const dots = Array.from({ length: 26 });

  return (
    <div className="loader">
      {dots.map((_, index) => (
        <div key={index} className="dot"></div>
      ))}
    </div>
  );
};

export default Loader;
