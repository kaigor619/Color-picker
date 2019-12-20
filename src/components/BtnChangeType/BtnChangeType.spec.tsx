import React from 'react';
import { shallow } from 'enzyme';
import { BtnChangeType } from './BtnChangeType';

describe('News container', () => {
  const props = {
    type: 'rgb',
    name: 'rgb',
    text: 'rgb',
    changeType: () => {},
  };

  it('Если у компонента enable=true', () => {
    const myComponent = shallow(<BtnChangeType {...props} />);
    expect(myComponent.find('button').hasClass('active')).toEqual(true);
  });
  //   it('Если у компонента enable=false', () => {
  //     props.enable = false;
  //     const myComponent = shallow(<CP {...props} />);
  //     expect(myComponent.isEmptyRender()).toEqual(true);
  //   });
});
