import React from 'react';
import Logo from '../../../../src/components/brand/Logo'
import './banner.scss';
import '../index.scss'

const Banner = () => (
    <div className="banner">


        <img className="banner-img" 
        src='https://res.cloudinary.com/mybukka/image/upload/v1586431637/edgar-castrejon-1SPu0KT-Ejg-unsplash_z4vudy.jpg' alt="banner" />


        <div className="banner-info">
            
            
            <div className="info-content">
                <Logo />
                <div>
                    <button className="log-in-btn">log in</button>
                    <button className="sign-up-btn">sign up</button>
                </div>
            </div>


            <div className="content">
                <h4>Grow Your Takeout Sales by 200%</h4>
                <p>With the top 3rd-party delivery platform for customer spend and retention.</p>
                <div className="text-align-center">
                    <button className="get-started-btn">Get started</button>
                </div>
            </div>


        </div>

        
    </div>
)

export default Banner