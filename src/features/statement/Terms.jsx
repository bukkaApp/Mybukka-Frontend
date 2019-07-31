import React from 'react';
import Statement from './component/Statement';
import data from './inputData/terms.json';


const Terms = () => <Statement activePage="Terms of Service" data={data} />;

export default Terms;
