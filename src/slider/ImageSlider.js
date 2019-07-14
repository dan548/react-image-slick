import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import MySlide from '../slide/MySlide';

export default class ImageSlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slideNumber: 0
    }
  }

  render() {
    const { height, width, image, basis, imagePositioning } = this.props;

    const mapToPartialSums = (arr) => {
      let partialSums = [];
      if (!arr.length) return partialSums;

      const totalSum = arr.reduce(function(sum, item) {
        partialSums.push(sum);
        return sum + item;
      });
      partialSums.push(totalSum);

      return partialSums;
    };

    const partials = mapToPartialSums(basis);

    partials.unshift(0);

    const fullWidth = partials[partials.length - 1];

    const primaryWidth = Math.max.apply(null, basis);

    const widthMultiplier = fullWidth / primaryWidth;

    const partialsWithFlags = partials.map((item) => {
      let begin = true;
      if (item + primaryWidth > fullWidth) {
        begin = false;
      }
      return {
        value: item,
        begin: begin,
        initial: true
      };
    });

    let allPartials = Array.from(partialsWithFlags);

    partialsWithFlags.forEach((item) => {
      if (item.begin && !allPartials.find((elem) => ((item.value + primaryWidth === elem.value) && elem.initial))) {
        allPartials.push({value: item.value + primaryWidth, begin: false, initial: false});
      }
      if ((item.value - primaryWidth > 0) && !allPartials.find((elem) => (item.value - primaryWidth === elem.value) && elem.initial)) {
        allPartials.push({value: item.value - primaryWidth, begin: true, initial: false});
      }
    });

    const temp = allPartials.slice().reverse();
    const count = temp.length - 1;

    allPartials = allPartials.filter((item, index) => {
      const tempIndex = temp.findIndex((elem) => elem.value === item.value);
      const finalIndex = tempIndex >= 0 ? count - tempIndex : tempIndex;
      return finalIndex <= index;
    });

    allPartials = allPartials.sort((a, b) => a.value - b.value);

    let beginIndices = [];

    allPartials.forEach((item, index) => {
      if (item.begin && index !== 0) {
        beginIndices.push(index);
      }
    });

    let slides = beginIndices.map((item, index) => {
      if (index === 0) {
        return item;
      }
      return item - beginIndices[index - 1];
      }
    );

    const scroll = Math.max.apply(null, slides);

    slides = slides.map((item) => {
      return scroll - item;
    });

    let interval = [];

    let marginCount = 0;

    allPartials.forEach((item, index) => {
      if (allPartials.length - 1 !== index) {
        interval.push({start: item.value, end: allPartials[index + 1].value, begin: item.begin});
        if (item.begin === true && marginCount < slides.length) {
          for (let i = 0; i < slides[marginCount]; i++) {
            interval.push({start: allPartials[index + 1].value, end: allPartials[index + 1].value, begin: item.begin});
          }
        }
      }
    });

    interval = interval.sort((a, b) => {
      const temp = a.start - b.start;
      return (temp === 0) ? a.end - b.end : temp;
    });

    let showSlides = [];

    interval.forEach((item, index) => {
      if (item.begin) {
        const endBlock = interval.findIndex(x => x.end === item.start + primaryWidth);
        showSlides.push(endBlock - index + 1);
      }
    });

    const initIndex = (showSlides.length - 1) / 2;
    const initSlides = showSlides[initIndex];

    const settings = {
      dots: true,
      arrows: false,
      infinite: false,
      variableWidth: true,
      ...this.props.sliderSettings,
      beforeChange: (current, next) => onSlideChange(next),
      slidesToShow: this.state.slideNumber ? this.state.slideNumber : initSlides,
      centerMode: false,
      slidesToScroll: scroll,
      initialSlide: initIndex * scroll
    };

    const onSlideChange = (current) => {
      this.setState({
        slideNumber: showSlides[current]
      });
    };

    return(
      <Slider {...settings}>
        {
          interval.map((elem, index) => {
            const elemWidth = (elem.end - elem.start);
            const showWidth = elemWidth ? elemWidth / primaryWidth * width : 0;
            return <MySlide key={index} className={`${this.props.slideClassName}`} additionalStyle={{
              ...this.props.slideStyle,
              height: `${height}px`, width: `${showWidth}px`,
              backgroundPositionX: `${-elem.start / primaryWidth * width}px`, backgroundSize: `${width *  widthMultiplier}px auto`,
              backgroundImage: `url(${image})`,
              backgroundRepeat: `no-repeat`,
              backgroundPositionY: `${imagePositioning}`
            }}/>;
          })
        }
      </Slider>
    );
  }
}

ImageSlider.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  image: PropTypes.any.isRequired,
  basis: PropTypes.arrayOf(PropTypes.number),
  sliderSettings: PropTypes.object,
  imagePositioning: PropTypes.string,
  slideStyle: PropTypes.object,
  slideClassName: PropTypes.string
};

ImageSlider.defaultProps = {
  imagePositioning: 'bottom',
  slideClass: ''
};
