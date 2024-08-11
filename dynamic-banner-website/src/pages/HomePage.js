import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';

const HomePage = () => {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        timer: 0,
        isVisible: false,
    });

    useEffect(() => {
        const fetchBanner = async () => {
            const result = await axios.get('/api/banner');
            setBannerData(result.data);
        };
        fetchBanner();
    }, []);

    return (
        <div>
            <Banner
                description={bannerData.description}
                link={bannerData.link}
                timer={bannerData.timer}
                isVisible={bannerData.isVisible}
            />
        </div>
    );
};

export default HomePage;
