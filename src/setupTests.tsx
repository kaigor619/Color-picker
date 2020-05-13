// @ts-ignore
import raf from 'tempPolyfills';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import toJson from 'enzyme-to-json'

// React 16 Enzyme adapter
Enzyme.configure({
  adapter: new Adapter(),
});

// @ts-ignore
global.shallow = shallow;
// @ts-ignore
global.render = render;
// @ts-ignore
global.mount = mount;
//global.toJson = toJson

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};
