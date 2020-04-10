import React from 'react';
import './footer.css';
import Logo from '../../../../src/components/brand/Logo';
const Footer = () => (
    <div class="footer pt-4 pb-4">
        <div class="container">
            <div class="row txt-white">
                <div class="bukka-description col-md-4 f-16 height-19">
                    <Logo />
                    <div class="pt-5 txt-white">
                        <p>The largest, most reliable on-demand delivery and pickup platform.</p>
                        <p class="pt-2">Able to deliver anything from any where, MyBukka is the food delivery, grocery delivery, whatever you can think of delivery app to bring what you crave right to your door.</p>
                    </div>
                </div>
                <div class="bukka-platforms col-md-2 f-15 height-18">
                    <h5>BUKKA</h5>
                    <p>About</p>
                    <p>Blog</p>
                    <p>Devlopers</p>
                    <p>Careers</p>
                    <p>Promtion Offers</p>
                    <p>Pickups</p>
                </div>
                <div class="col-md-2 f-15 height-18">
                    <h5>MERCHANTS</h5>
                    <p>Sell on Bukka</p>
                    <p>Restaurants</p>
                    <div class="pt-5">
                        <h4>SUPPORTS</h4>
                        <p>Customer Help</p>
                        <p>Merchant Help</p>
                    </div>
                </div>
                <div class="bukka-cities col-md-2 f-15 height-18">
                    <h5>CITIES</h5>
                    <p>Lagos</p>
                    <p>Akure</p>
                    <p>Osogbo</p>
                    <p>Abuja</p>
                    <p>Kogi</p>
                    <p>Kano</p>
                </div>
                <div class="bukka-handle col-md-2 f-15 height-18">
                    <h5>FOLLOW US</h5>
                    <p>Twitter</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                </div>
            </div>
            <hr class="line" />
            <div class="d-flex justify-content txt-white f-16">
                <p>©2019 MYBUKKA INC TERMS PRIVACY </p>
                <div>
                    <span class="pr-4">Terms and Policy</span>
                    <span>Privacy</span>
                </div>
            </div>

        </div>
    </div>
);

export default Footer;