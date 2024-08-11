// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        timer: 0,
        isVisible: false,
    });
    const [loading, setLoading] = useState(true);
    const [inputValues, setInputValues] = useState({
        description: '',
        link: '',
        timer: 0,
        isVisible: false,
    });

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/banner');
                setBannerData(response.data);
                setInputValues({
                    description: response.data.description,
                    link: response.data.link,
                    timer: response.data.timer,
                    isVisible: response.data.isVisible,
                });
            } catch (error) {
                console.error('Failed to fetch banner data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBannerData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputValues({
            ...inputValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/banner', {
                description: inputValues.description,
                link: inputValues.link,
                timer: inputValues.timer,
                isVisible: inputValues.isVisible,
            });
            alert('Banner updated successfully');
        } catch (error) {
            console.error('Failed to update banner data:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <h2>Banner Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Banner Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={inputValues.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="link">Banner Link:</label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={inputValues.link}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timer">Banner Timer (seconds):</label>
                    <input
                        type="number"
                        id="timer"
                        name="timer"
                        value={inputValues.timer}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isVisible">Banner Visible:</label>
                    <input
                        type="checkbox"
                        id="isVisible"
                        name="isVisible"
                        checked={inputValues.isVisible}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Banner</button>
            </form>
        </div>
    );
};

export default Dashboard;
