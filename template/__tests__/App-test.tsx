/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {LoadingView} from '../src/components/base/LoadingPortal';

it('loading view test renders correctly', () => {
  const tree = renderer.create(<LoadingView />).toJSON();
  expect(tree).toMatchSnapshot('loading view test renders');
});
