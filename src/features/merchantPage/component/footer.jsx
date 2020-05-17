import React from 'react';
import './footer.css';
import Logo from '../../../../src/components/brand/Logo';
import '../index.scss'
const Footer = () => (
    <div className="footer pt-4 pb-4">


        <div className="container pt-4">


            <div className="row txt-white">


                <div className="bukka-description col-md-6 col-lg-4 f-16 height-19">


                    <Logo />


                    <div className="pt-5 txt-white f-16">
                        <p>The largest, most reliable on-demand delivery and pickup platform.</p>
                        <p className="pt-2">Able to deliver anything from any where, MyBukka is the food delivery, grocery delivery, whatever you can think of delivery app to bring what you crave right to your door.</p>
                    </div>


                </div>


                <div className="bukka-platforms col-md-3 col-lg-2 f-15 height-18">
                    <h5>BUKKA</h5>
                    <p>About</p>
                    <p>Blog</p>
                    <p>Devlopers</p>
                    <p>Careers</p>
                    <p>Promtion Offers</p>
                    <p>Pickups</p>
                </div>


                <div className="col-md-3 col-lg-2 f-15 height-18 sm-padding">
                    <h5>MERCHANTS</h5>
                    <p>Sell on Bukka</p>
                    <p>Restaurants</p>
                    <div className="pt-4">
                        <h5>SUPPORTS</h5>
                        <p>Customer Help</p>
                        <p>Merchant Help</p>
                    </div>
                </div>


                <div className="bukka-cities col-md-6 col-lg-2 f-15 height-18 sm-padding">
                    <h5>CITIES</h5>
                    <p>Lagos</p>
                    <p>Akure</p>
                    <p>Osogbo</p>
                    <p>Abuja</p>
                    <p>Kogi</p>
                    <p>Kano</p>
                </div>


                <div className="bukka-handle col-md-6 col-lg-2 f-15 height-18 sm-padding">
                    <h5>FOLLOW US</h5>
                    <p>Twitter</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                </div>


            </div>


            <hr className="line" />


            <div className="d-privacy justify-content txt-white f-16">
                <p>©2019 MYBUKKA INC TERMS PRIVACY </p>
                <div>
                    <span className="pr-4 policy">Terms and Policy</span>
                    <span className="privacy">Privacy</span>
                </div>
            </div>

        </div>

        
    </div>
);

export default Footer;