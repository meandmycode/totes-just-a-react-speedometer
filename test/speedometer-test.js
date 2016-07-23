import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Speedometer from '../src/speedometer.js';

require('intl/locale-data/jsonp/en.js')

const format = { style: 'currency', currency: 'GBP' }

describe('Speedometer', function() {
  it('has the speedometer class applied', function() {
    expect(shallow(<Speedometer />).is('.speedometer')).toBe(true);
  });

  it('hides the min label unless min, max and value are specified', function() {
    const speedometer = render(<Speedometer min={0} />);
    const minLabel = speedometer.find('.speedometer__min-label');

    expect(minLabel.prop('hidden')).toBe(true);
  });

  it('hides the max label unless min, max and value are specified', function() {
    const speedometer = render(<Speedometer max={0} />);
    const minLabel = speedometer.find('.speedometer__max-label');

    expect(minLabel.prop('hidden')).toBe(true);
  });

  it('hides the value label unless min, max and value are specified', function() {
    const speedometer = render(<Speedometer value={0} />);
    const minLabel = speedometer.find('.speedometer__value-label');

    expect(minLabel.prop('hidden')).toBe(true);
  });

  it('asserts the max value is greater than the min value', function() {
    const speedometerRenderer = () => shallow(<Speedometer min={15} max={10} />);

    expect(speedometerRenderer).toThrow();
  });

  it('asserts the max value is greater than the min value when changing', function() {
    const speedometerRenderer = () => {
        const speedometer = shallow(<Speedometer min={0} max={10} />);
        speedometer.setProps({ min: 15 })
    }

    expect(speedometerRenderer).toThrow();
  });

  it('has a min value label whose value matches the min value', function() {
    const speedometer = render(<Speedometer min={0} max={10} />);
    const minLabel = speedometer.find('.speedometer__min-label');

    expect(minLabel.text()).toBe('0');
  });

  it('has a min value label whose value matches the formatted min value when given a formatting context', function() {
    const speedometer = render(<Speedometer min={0} max={10} formatOptions={format} />);
    const minLabel = speedometer.find('.speedometer__min-label');

    expect(minLabel.text()).toBe('£0');
  });

  it('has a max value label whose value matches the max value', function() {
    const speedometer = render(<Speedometer min={0} max={10} />);
    const maxLabel = speedometer.find('.speedometer__max-label');

    expect(maxLabel.text()).toBe('10');
  });

  it('has a max value label whose value matches the formatted max value when given a formatting context', function() {
    const speedometer = render(<Speedometer min={0} max={10} formatOptions={format} />);
    const maxLabel = speedometer.find('.speedometer__max-label');

    expect(maxLabel.text()).toBe('£10');
  });

  it('renders a pointer at -90 degrees in rotation to visually indicate the current values progression between min and max values', function() {
    const speedometer = render(<Speedometer min={0} max={10} value={0} formatOptions={format} />);
    const pointer = speedometer.find('.speedometer__pointer');

    expect(pointer.prop('style').transform).toBe('rotate(-90deg)');
  });

  it('renders a pointer at 90 degrees in rotation to visually indicate the current values progression between min and max values', function() {
    const speedometer = render(<Speedometer min={0} max={10} value={10} formatOptions={format} />);
    const pointer = speedometer.find('.speedometer__pointer');

    expect(pointer.prop('style').transform).toBe('rotate(90deg)');
  });

  it('renders a pointer at 0 degrees in rotation to visually indicate the current values progression between min and max values', function() {
    const speedometer = render(<Speedometer min={0} max={10} value={5} formatOptions={format} />);
    const pointer = speedometer.find('.speedometer__pointer');

    expect(pointer.prop('style').transform).toBe('rotate(0deg)');
  });
});
