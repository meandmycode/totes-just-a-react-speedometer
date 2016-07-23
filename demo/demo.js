import React, { Component } from 'react'
import regeneratorRuntime from 'regenerator-runtime-only'
import { render } from 'react-dom';
import Speedometer from 'speedometer';

import './demo.scss'
import 'speedometer.scss'

const data = {
  'value': 34,
  'min': 0,
  'max': 200,
  'format': 'currency',
  'unit': 'GBP'
}

// fixup weirdness that can happen in API data where min values are larger than max values, in this case we'll swap them
function fixup({ min: maybeMin, max: maybeMax, value: unclampedValue, ...etc }) {
  const min = Math.min(maybeMin, maybeMax);
  const max = Math.max(maybeMin, maybeMax);
  const value = Math.min(max, Math.max(min, unclampedValue));

  return { min, max, value, ...etc };
}

class Demo extends Component {

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const response = await fetch('https://widgister.herokuapp.com/challenge/frontend');
    const data = fixup(await response.json());

    console.log(data)

    this.setState({ data });

    setTimeout(::this.getData, 3000);
  }

  render () {
    const { data } = this.state || {};
    const { format: style, unit: currency, ...etc } = data || {};

    const numberFormat = { style, currency };

    return (
      <Speedometer {...etc} formatOptions={numberFormat} />
    );
  }
}

render(<Demo />, document.querySelector('#container'));
