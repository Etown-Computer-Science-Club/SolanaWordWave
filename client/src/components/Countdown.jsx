import { useState, useEffect } from 'react';

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemainingUntilMidnight());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining(getTimeRemainingUntilMidnight());
    }, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  function getTimeRemainingUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeDifference = midnight - now;

    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return (
    <div>
      <h2>Time Remaining Until Refresh:</h2>
      <p>
        {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds
      </p>
    </div>
  );
}

export default Countdown;
