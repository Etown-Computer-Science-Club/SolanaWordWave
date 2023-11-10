import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import moment from 'moment-timezone';

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

  function newDate() {
    const date = new Date();
    return moment(date).tz('America/New_York').toDate();
  }

  function getTimeRemainingUntilMidnight() {
    const now = newDate();
    const midnight = newDate();
    midnight.setHours(24, 0, 0, 0);
    const timeDifference = midnight - now;

    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return (
    <Box textAlign={"center"}>
      <h2>Time Remaining:</h2>
      <p>
        {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds
      </p>
    </Box>
  );
}

export default Countdown;
