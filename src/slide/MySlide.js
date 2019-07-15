import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class MySlide extends React.Component {

  render() {
    const style = {
      ...this.props.style,
      ...this.props.additionalStyle
    };

    const className = this.props.className ? ` ${this.props.className}` : '';

    return(
      <div className={`slide${className}`} style={style}/>
    );
  }
}

MySlide.propTypes = {
  style: PropTypes.object,
  additionalStyle: PropTypes.object.isRequired,
  className: PropTypes.string
};
