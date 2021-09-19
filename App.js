import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigations';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  const [loaded] = useFonts({
    'Panton-LightCaps': require('./assets/fonts/Panton-LightCaps.otf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
