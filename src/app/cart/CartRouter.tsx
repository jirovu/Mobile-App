import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { Stack } from '../actions.config';
import ProductDetail from '../home/components/ProductDetail';
import CartScreen from './components/CartScreen';

interface Props {

}

const CartRouter = (props: Props) => {
  const nav = useNavigation();

  return <>
    <Stack.Navigator initialRouteName="Cart Product">
      <Stack.Screen
        name="Cart Product"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart Detail"
        component={ProductDetail}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={() => nav.navigate('Cart Product')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  </>
}

export default CartRouter
