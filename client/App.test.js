import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { App } from './App';

let props;

describe('Test AppComponent', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('successfully rendered', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('check for redirections', () => {
    const wrapper = shallow(<App />);
    const a = wrapper.find(Route);
    expect(a.length).toEqual(1);
  });
});
