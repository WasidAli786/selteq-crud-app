"use client";

import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Change background and text color every 10 seconds
    const colorInterval = setInterval(() => {
      setBackgroundColor(getRandomColor());
      setTextColor(getRandomColor());
    }, 10000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, []);

  const getRandomColor = () => {
    // Generate a random color in hexadecimal format
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const formattedTime = time.toLocaleTimeString();

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      className="p-5 text-xl text-center rounded-lg"
    >
      {formattedTime}
    </div>
  );
};

export default DigitalClock;
