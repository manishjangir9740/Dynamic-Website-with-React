import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Helper function to calculate time left
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

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/banner'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDashboardData(data);
                // Initialize countdown timer
                setTimeLeft(calculateTimeLeft(data.endTime));

                // Update timer every second
                const timer = setInterval(() => {
                    setTimeLeft(calculateTimeLeft(data.endTime));
                }, 1000);

                // Cleanup interval on component unmount
                return () => clearInterval(timer);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <h2>Welcome to our site!</h2>
            <a href={dashboardData?.link} target="_blank" rel="noopener noreferrer">Click Here</a>
            <div className="banner">
                <p>Description: {dashboardData?.description}</p>
                <p>Time remaining: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
            </div>
        </div>
    );
};

export default Dashboard;
