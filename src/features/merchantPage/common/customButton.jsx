import React from 'react';
import './customButton.scss';


const CustomButton = ({ buttonChildren, spanChildren }) => (
    <div>


        <button className="custom-button mt-3">{buttonChildren}</button> <span className="custom-span">{spanChildren}</span>
    
    
    </div>
);

export default CustomButton;