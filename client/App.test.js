import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Router, Route } from 'react-router-dom';

import { App } from './App';
let props;

describe("Test AppComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('successfully rendered', () => {
    const wrapper = shallow(<App { ...props }/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('check for redirections', () => {
    const wrapper = shallow(<App />);
    let a = wrapper.find(Route);
    expect(a.length).toEqual(1);
  });
});
