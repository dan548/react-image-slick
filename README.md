# React Slick Image
##### Image sliding plugin for [react-slick](http://react-slick.neostack.com/)

## Documentation

### Props

#### height
*Type*: number (required)

*Default*: undefined

*Description*: the height of your slider (in *heightUnit*s)

#### heightUnit
*Type*: string

*Default*: 'px'

*Description*: unit of length for height (**note**: '%' is not supported)

#### width
*Type*: number

*Default*: undefined (slider takes the entire block based on [react-sizeme](https://github.com/ctrlplusb/react-sizeme)'s data)

*Description*: the width of your slider (in *widthUnit*s)

#### widthUnit
*Type*: string

*Default*: 'px'
  
*Description*: unit of length for width (**note**: '%' is not supported)
  
#### image
*Type*: image (required)

*Default*: undefined

*Description*: sliding image

#### basis
*Type*: number\[\] (required)

*Default*: undefined

*Description*: weights to partition image with (*ex.:* "1, 2, 3" means that the image will be split in the ratio of 1:2:3 where 3 as max value defines appropriate part to be the only shown initially)

#### sliderSettings
*Type*: object

*Default*: undefined

*Description*: specifies any settings of the inner [slider](http://react-slick.neostack.com/)

**NOTE!** *beforeChange*, *slidesToShow*, *centerMode*, *slidesToScroll* and *initialSlide* can't be overridden!

#### imagePositioning
*Type*: string

*Default*: 'bottom'

*Description*: defines 'y' position of the visible image part

#### slideStyle (not recommended)
*Type*: object

*Default*: undefined

*Description*: inline styling of the slide

#### slideClassName
*Type*: string

*Default*: ''
  
*Description*: css way to style a slide

### Installation 


**npm**

```bash
npm install react-slick-image --save
```

**yarn**

```bash
yarn add react-slick-image
```

### Example

```javascript
import React from 'react';
import ReactDOM  from 'react-dom';

import ImageSlider from '../../src/index';
import image from './bg.jpg';

ReactDOM.render(
    <ImageSlider height={300} image={image} width={1000} basis={[280, 700, 300]}/>,

    document.getElementById('root'));
```

### Development

*How to run demo*

```bash
git clone https://github.com/dan548/react-image-slick
cd react-image-slick
npm install
npm start
open http://localhost:3001
```