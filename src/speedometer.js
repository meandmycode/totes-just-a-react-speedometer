import React, { Component, PropTypes } from 'react';

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};

const baseClassName = 'speedometer';

const baseFormatOptions = {
  minimumFractionDigits: 0
};

function getRotationFromMinMaxAndValue(min, max, value) {

  const range = max - min;
  const progress = (value - min) / range;

  // our rotation is between -90 and 90 degrees
  const rotationDegrees = (progress - 0.5) * 180;

  return `rotate(${rotationDegrees}deg)`;
}

function validateProps({ min, max }) {
  if (min >= max) {
    throw new Error(`Speedometer min value must be greater than max value`);
  }
}

class Speedometer extends Component {

  constructor(props) {
    super(props)

    validateProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    validateProps(nextProps);
  }

  render() {
    const { min, max, value, formatOptions: customFormatOptions } = this.props;
    const { locale } = this.context;

    // indicate if the component has enough fields that will allow a full
    // render of the components visual state
    const hasCompleteData = min != null && max != null && value != null;
    const formatOptions = { ...baseFormatOptions, ...customFormatOptions };

    // todo: this can be optimised by hooking `componentWillUpdate` and generating
    // the format once and recording it in internal component state
    const numberFormat = new Intl.NumberFormat(locale, formatOptions);

    const pointerRotation = hasCompleteData
      ? getRotationFromMinMaxAndValue(min, max, value)
      : null;

    return (
      <div className={baseClassName}>
        <div
          className={`${baseClassName}__value-label`}
          hidden={!hasCompleteData}>
          {numberFormat.format(value)}
        </div>
        <div className={`${baseClassName}__meter`}>
          <div className={`${baseClassName}__dial`} />
          <div
            className={`${baseClassName}__pointer`}
            style={{ transform: pointerRotation }}
            hidden={!hasCompleteData}
          />
        </div>
        <div className={`${baseClassName}__labels`}>
          <div
            className={`${baseClassName}__min-label`}
            hidden={!hasCompleteData}>
            {numberFormat.format(min)}
          </div>
          <div
            className={`${baseClassName}__max-label`}
            hidden={!hasCompleteData}>
            {numberFormat.format(max)}
          </div>
        </div>
      </div>
    );
  }
}

Speedometer.propTypes = propTypes;

export default Speedometer;
