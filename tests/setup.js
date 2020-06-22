import 'idempotent-babel-polyfill';

import { configure, mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { render, fireEvent, getByTestId, cleanup } from 'react-testing-library';
import { Provider } from 'react-redux';
import axios from '../src/redux/axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({ adapter: new Adapter() });

global.mount = mount;
global.shallow = shallow;
global.moxios = moxios;
global.mockStore = mockStore;
global.axiosInstance = axios;
global.apiBaseUrl = 'http://localhost:1234/api/v1/';
global.render = render;
global.fireEvent = fireEvent;
global.getByTestId = getByTestId;
global.cleanup = cleanup;
global.Provider = Provider;
