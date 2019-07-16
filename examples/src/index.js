import React from 'react';
import ReactDOM  from 'react-dom';

import ImageSlider from '../../src/index';
import image from './bg.jpg';
import './style.css';

ReactDOM.render(
    <main className={'main'}>
        <ImageSlider imagePositioning={'center'} slideClassName={'slider'} image={image} height={50} heightUnit={'vh'} basis={[200, 500, 300]}/>
    </main>,

    document.getElementById('root'));