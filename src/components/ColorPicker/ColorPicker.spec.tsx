import React from 'react';
import { shallow } from 'enzyme';
import { CP } from './ColorPicker';

describe('News container', () => {
  const props = {
    enable: true,
  };

  it('Если у компонента enable=true', () => {
    const myComponent = shallow(<CP {...props} />);
    expect(myComponent.isEmptyRender()).toEqual(false);
  });
  it('Если у компонента enable=false', () => {
    props.enable = false;
    const myComponent = shallow(<CP {...props} />);
    expect(myComponent.isEmptyRender()).toEqual(true);
  });
});
