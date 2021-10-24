import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigations';
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import dataReducer from './dataReducer';

export default function App() {
  const [loaded] = useFonts({
    'Panton-LightCaps': require('./assets/fonts/Panton-LightCaps.otf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  
  const rootReducer = combineReducers({
    content: dataReducer,
  });

  const store = createStore(rootReducer);


  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
