import React from 'react';
import ReactDOM  from 'react-dom';

import ImageSlider from '../../src/index';
import image from './bg.jpg';

ReactDOM.render(
    <ImageSlider height={300} image={image} width={1000} basis={[280, 700, 300]}/>,

    document.getElementById('root'));