import {createDrawerNavigator} from '@react-navigation/drawer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {setNavigator} from 'src/navigation/navigationService';
import StackNavigation from './stackNavigation';
const Drawer = createDrawerNavigator();

const DrawerNavigation = (): React.ReactElement => {
  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <NavigationContainer ref={setNavigator} theme={customDefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Stack"
        screenOptions={{
          swipeEnabled: false,
        }}>
        <Drawer.Screen
          name="Stack"
          component={StackNavigation}
          options={() => {
            return {
              swipeEnabled: false,
              drawerLabel: 'Home',
              headerShown: false,
            };
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
