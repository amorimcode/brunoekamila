// Countdown.tsx

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeRemaining = (): {
    days: number;
    hours: number;
    minutes: number;
  } => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const renderSquare = (value: number, unit: string) => (
    <div className="square">
      <div className="value">{value}</div>
      <div className="unit">{unit}</div>
    </div>
  );

  return (
    <div className="">
      <div className="countdown-container">
        {renderSquare(timeRemaining.days, "Dias")}
        {renderSquare(timeRemaining.hours, "Horas")}
        {renderSquare(timeRemaining.minutes, "Minutos")}
      </div>
    </div>
  );
};

export default Countdown;
