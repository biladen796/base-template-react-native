import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DefaultTitleActionBar from 'src/components/base/DefaultTitleActionBar';
import Dummy from 'src/features/Dummy';
const Stack = createStackNavigator<RootStackParamList>();
const NO_HEADER = {header: () => null};

export enum navigationRoutes {
  // DUMMY
  DUMMY = 'DUMMY',
}

const TitleHeader = (
  title: string,
  {
    type = 'LAYOUT_1',
    leftIconsConfig,
    rightIconsConfig,
  }: {
    type?: 'LAYOUT_1' | 'LAYOUT_2';
    leftIconsConfig?: {
      icon: JSX.Element;
      onPress: () => void;
    }[];
    rightIconsConfig?: {
      icon: JSX.Element;
      onPress: () => void;
    }[];
  } = {},
) => {
  return {
    header: () => (
      <DefaultTitleActionBar
        title={title}
        type={type}
        leftIconsConfig={leftIconsConfig}
        rightIconsConfig={rightIconsConfig}
      />
    ),
  };
};

export type RootStackParamList = {
  [navigationRoutes.DUMMY]: undefined;
};

const StackNavigation = (): React.ReactElement => {
  return (
    <Stack.Navigator initialRouteName={navigationRoutes.DUMMY}>
      <Stack.Screen
        options={TitleHeader('Tiến IT')}
        name={navigationRoutes.DUMMY}
        component={Dummy}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
