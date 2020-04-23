import React from 'react';
import {Stack} from '../actions.config';
import HomeScreen from './components/HomeScreen';

interface Props {}

const HomeRouter: React.FC<Props> = (props) => {
  return (
    <>
      <Stack.Navigator initialRouteName="Product">
        <Stack.Screen
          name="Product"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default React.memo(HomeRouter);
