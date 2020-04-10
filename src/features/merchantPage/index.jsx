import React, { Fragment } from 'react';
import Banner from './component/banner';
import Description from './component/description';
import NavDescription from './component/navDescription';
import OrderDescription from './component/orderDescription';
import PresenceDescription from './component/presenceDesccription';
import Footer from './component/footer'
import './index.scss';

const Merchant = () => (
    <Fragment>
        <Banner /> 
        <Description />
        <NavDescription />
        <PresenceDescription />
        <OrderDescription />
        <Footer />
    </Fragment>
)


export default Merchant;
