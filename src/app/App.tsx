import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import { appStore } from './store.config';


interface Props { }

const App: React.FC<Props> = (props) => {
  return (
    <Provider store={appStore}>
      <AppRouter />
    </Provider>
  );
};

export default React.memo(App);
