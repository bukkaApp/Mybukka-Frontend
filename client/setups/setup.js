import { configure } from 'enzyme';
import expect from 'expect';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

