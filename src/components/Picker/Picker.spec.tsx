import React from 'react';
import { shallow, mount } from 'enzyme';
import { Picker } from './Picker';
import { default_style_options } from '../../reducers';
import Convert from '../../options/convert';
import Model from '../../options/modelsColor';

describe('InputCell', () => {
  let props: any = {
    H: 43,
    S: 100,
    V: 100,
    rgbMain: [255, 187, 0],
    style_options: default_style_options,
    add_color: mas => {},
  };

  it('Проверка правильных стилей для block', () => {
    const myComponent = mount(<Picker {...props} />);
    let { style } = myComponent.find('#cp_block-picker').props();
    let rgb = 'rgb(' + Convert.hsv_rgb(props.H, 100, 100) + ')';
    let { width: w, height: h } = default_style_options.picker;
    let b = `linear-gradient(to top, rgb(0, 0, 0), transparent), linear-gradient(to left, ${rgb} , rgb(255, 255, 255))`;

    let { width, height, background } = style;
    expect([width, height, background]).toEqual([w + 'px', h + 'px', b]);
  });
  it('Проверка правильных стилей для circle', () => {
    const myComponent = mount(<Picker {...props} />);
    let { style } = myComponent.find('#cp_block-circle').props();
    let { width, height } = default_style_options.circle;
    const backgroundColor = Model.rgb.getStr(props.rgbMain);

    let left = '250px';
    let top = '0px';
    expect(style).toEqual({
      width: width + 'px',
      height: height + 'px',
      left,
      top,
      backgroundColor,
    });
  });
});
