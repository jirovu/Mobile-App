import React from 'react';
import { Stack } from '../actions.config';
import HomeScreen from './components/HomeScreen';
import ProductDetail from './components/ProductDetail';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface Props { }

const HomeRouter: React.FC<Props> = (props) => {

  const nav = useNavigation();

  return (
    <>
      <Stack.Navigator initialRouteName="Home Product">
        <Stack.Screen
          name="Home Product"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home Detail"
          component={ProductDetail}
          options={{
            headerLeft: (props) => (
              <HeaderBackButton
                onPress={() => nav.navigate('Home Product')}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default React.memo(HomeRouter);
