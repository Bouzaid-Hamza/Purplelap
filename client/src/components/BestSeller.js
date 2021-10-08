import React from 'react';
import Laptop from './Laptop';

const BestSeller = (props) => (
    <Laptop {...props} type="best-seller" dataLabel="Best Seller" />
);

export default BestSeller;
