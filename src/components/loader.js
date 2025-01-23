import React, { useState, useEffect } from "react";
import "../styling/loader.css";

const Loader = ({ loading, colors = {} }) => {
  const [borderRadius, setBorderRadius] = useState({
    before: "58% 42% 48% 53% / 47% 60% 36% 53%",
    after: "48% 42% 48% 53% / 47% 60% 36% 53%",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const generateRandomBorderRadiusValue = (prevValue, isLoading) => {
    const min = 10;
    const max = 90;
    let value;

    if (isLoading) {
      value = Math.floor(Math.random() * (max - min + 1)) + min;
      if (value >= 45 && value <= 55) {
        value = value < 30 ? 70 : 75;
      }
    } else {
      value = Math.floor(Math.random() * (max - min + 1)) + min;
      if (value >= 45 && value <= 55) {
        value = value > 50 ? 45 : 47;
      }
    }

    const newValue = prevValue + (value - prevValue) * 0.5;
    return Math.min(Math.max(min, newValue), max);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderRadius((prevBorderRadius) => {
        const prevBeforeValues = prevBorderRadius.before.split(" / ")[0].split(" ").map((v) => parseFloat(v));
        const prevAfterValues = prevBorderRadius.after.split(" / ")[0].split(" ").map((v) => parseFloat(v));

        const xBefore = generateRandomBorderRadiusValue(prevBeforeValues[0], loading);
        const yBefore = generateRandomBorderRadiusValue(prevBeforeValues[2], loading);
        const xAfter = generateRandomBorderRadiusValue(prevAfterValues[0], loading);
        const yAfter = generateRandomBorderRadiusValue(prevAfterValues[2], loading);

        return {
          before: `${xBefore}% ${100 - xBefore}% ${yBefore}% ${100 - yBefore}% / ${100 - yBefore}% ${xBefore}% ${100 - xBefore}% ${yBefore}%`,
          after: `${xAfter}% ${100 - xAfter}% ${yAfter}% ${100 - yAfter}% / ${yAfter}% ${100 - yAfter}% ${xAfter}% ${100 - xAfter}%`,
        };
      });
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const blobClass = loading ? "blob loading" : "blob";
  const loaderClass = loading ? "loader" : "loaderChill";

  return (
    <div className="loader-container">
      <div
        id="blob"
        className={blobClass}
        style={{
          "--border-radius-before": borderRadius.before,
          "--border-radius-after": borderRadius.after,
          "--loader-color1": colors.color1 || '#238a79',
          "--loader-color2": colors.color2 || '#16425a',
          "--loader-color3": colors.color3 || '#7aa7c0',
          "--loader-color4": colors.color4 || '#1cddbd',
          "--loader-color5": colors.color5 || '#091b25',
          "--loader-color6": colors.color6 || '#113e68',
          "--loader-color7": colors.color7 || '#1c646c4d',

        }}
      >
        <div className={loaderClass}
          style={{
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          }}></div>
      </div>
    </div>
  );
};

export default Loader;