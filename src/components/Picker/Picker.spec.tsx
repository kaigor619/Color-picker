import React from 'react';
import { shallow, mount } from 'enzyme';
import { Picker } from './Picker';
import { default_style_options } from '../../reducers';

describe('InputCell', () => {
  let props: any = {
    H: 43,
    S: 100,
    V: 100,
    rgbMain: [255, 187, 0],
    style_options: default_style_options,
    add_color: mas => {},
  };

  it('Проверка правильных стилей', () => {
    const myComponent = mount(<Picker {...props} />);
    console.log(myComponent.props());
    // let label = myComponent.state('label');
    // expect(+label).toEqual(14);
  });
});
