import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { App } from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// import {spy} from 'sinon';
import { Router, Route } from 'react-router-dom';

configure({ adapter: new Adapter() });


describe("Test AppComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('check for redirections', () => {
    const wrapper = shallow(<App />);
    let a = wrapper.find(Route);
    expect(a.length).toEqual(1);
  });
});
