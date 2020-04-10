import React from 'react'; 
import './presenceDescription.css';
import '../index.scss';
import CustomButton from '../common/customButton'

const PresenceDescription = () => (
    <div className="digital-info pb-5">
        <div className="container">
            <div className="row mx-0">
                <div className="col-md-6 mt-5">
                    <h4>Boost your digital presence.</h4>
                    <p>Grow your sales and become a favorite by getting in front of more people at the exact moment they’re ready to buy. They come to us, we introduce them to you.</p>
                    <CustomButton buttonChildren= '10,000 +' spanChildren= 'business online' />
                </div>
                <div className="col-md-6 mt-5 pl-3">
                    <img src="https://res.cloudinary.com/mybukka/image/upload/v1586035063/phone_xiqrcw.jpg" 
                    alt="meal-image" className="meal-img" />

                </div>
            </div>
        </div>
    </div>
); 

export default PresenceDescription;