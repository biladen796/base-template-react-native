import React, {useEffect} from 'react';
import DrawerNavigation from 'src/navigation/drawerNavigation';
import {ModalPortal} from 'react-native-modals';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from 'src/redux/root.reducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import LoadingPortal from 'src/components/base/LoadingPortal';
import {StatusBar} from 'react-native';
import * as Sentry from '@sentry/react-native';
import {initLogger} from 'src/services/logger/SentryLogger';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  // Initial load system's settings
  useEffect(() => {
    initLogger();
  }, []);

  return (
    <Provider store={store}> 
      <StatusBar translucent backgroundColor="transparent" />
      <DrawerNavigation />
      <ModalPortal />
      <LoadingPortal />
    </Provider>
  );
};

export default Sentry.wrap(App);
