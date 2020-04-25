import React from 'react';
import './navDescription.css';
import CustomButton from '../common/customButton'
import '../index.scss'

const NavDescription = () => (
    <div className="navigation-info pb-5">


        <div className="container">


            <div className="row mx-0">


                <div className="col-md-6 mt-5">
                    <img src="https://res.cloudinary.com/mybukka/image/upload/v1586035039/map_ldxsly.jpg" 
                    alt="map" className="map-img" />
                </div>


                <div className="col-md-6 mt-5 pl-3">
                    <h4 className="mt-5">Connect with new local customers.</h4>
                    <p> Grow your sales and become a favorite by getting in front of more people at the exact moment they’re ready to buy. They come to us, we introduce them to you.</p>
                    <CustomButton buttonChildren= '5,000 +' spanChildren= 'daily searches' />
                </div>
            
            
            </div>


        </div>


    </div>
);

export default NavDescription;