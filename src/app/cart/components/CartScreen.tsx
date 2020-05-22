import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../home/components/ProductItem';
import { RootState } from '../../store.config';

interface Props { }

const CartScreen: React.FC<Props> = (props: Props) => {

  const nav = useNavigation();
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const carts = useSelector((state: RootState) => state.cart.carts);

  const onOrder = () => {

  }

  return <>
    {
      isLogged ?
        ((carts && carts.length > 0) ?
          <View>
            {
              carts.map(e => (
                <React.Fragment key={e.id}>
                  <ProductItem product={e} isCart={true} />
                </React.Fragment>
              ))
            }

            <Button
              title="Dat hang"
              onPress={onOrder}
            />
          </View>
          :
          <Text style={{ textAlign: 'center', margin: 'auto' }}>Empty Cart</Text>)
        :
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Please login to continue</Text>
          <Button
            title="Login"
            onPress={() => nav.navigate('User', { screen: 'Login' })}
          />
        </View>
    }
  </>
};

export default React.memo(CartScreen);
