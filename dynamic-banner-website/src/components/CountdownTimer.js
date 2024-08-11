import React, { useState, useEffect } from 'react';

// Function to calculate time left
const calculateTimeLeft = (endTime) => {
    const difference = endTime - new Date().getTime();
    const total = Math.max(difference, 0);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds,
    };
};

const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime));

    useEffect(() => {
        // Update the timer every second
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(endTime);
            setTimeLeft(newTimeLeft);
            // Stop the timer when the countdown is finished
            if (newTimeLeft.total <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div className="countdown-timer">
            {timeLeft.total <= 0 ? (
                <span>Time is up!</span>
            ) : (
                <span>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
            )}
        </div>
    );
};

export default CountdownTimer;
