import React from 'react'
import store from './src/redux/store';
import Router from './router';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0067FF',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </PaperProvider>
  )
}
