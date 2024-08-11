import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css';
import CountdownTimer from './CountdownTimer'; // Ensure this is the correct path to your CountdownTimer component
import Dashboard from './Dashboard'; // Import the Dashboard component

const Banner = () => {
    const [bannerData, setBannerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDashboard, setShowDashboard] = useState(false); // State to manage dashboard visibility

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/banner');
                setBannerData(response.data);
            } catch (error) {
                console.error('Failed to fetch banner data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBannerData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!bannerData || !bannerData.isVisible) {
        return null;
    }

    // Pass endTime to CountdownTimer component
    const endTime = bannerData.endTime;

    return (
        <div>
            <div className="banner">
                <h2>{bannerData.description}</h2>
                <a href={bannerData.link}>Click Here</a>
                <CountdownTimer endTime={endTime} />
                {/* Button to toggle Dashboard visibility */}
                <button onClick={() => setShowDashboard(!showDashboard)}>
                    {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
                </button>
            </div>

            {/* Conditionally render the Dashboard */}
            {showDashboard && <Dashboard />}
        </div>
    );
};

export default Banner;
