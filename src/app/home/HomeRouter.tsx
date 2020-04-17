import React from 'react';
import { Stack } from '../actions.config';
import ProductScreen from './components/ProductScreen';

interface Props {

}

const HomeRouter: React.FC<Props> = (props) => {
  return <>
    <Stack.Navigator initialRouteName='Product'>
      <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </>
}

export default React.memo(HomeRouter);
