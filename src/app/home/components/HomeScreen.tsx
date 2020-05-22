import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction } from '../../cart/cart.actions';
import { Product } from '../../cart/cart.state';
import { db } from '../../firebase.config';
import { RootState } from '../../store.config';
import { homeAction } from '../home.actions';
import ProductItem from './ProductItem';

interface Props { }

const HomeScreen: React.FC<Props> = () => {

  const dispatch = useDispatch<any>();
  const { email, isLogged } = useSelector((state: RootState) => state.login);
  const product = useSelector((state: RootState) => state.product.product);

  useEffect(() => {
    db.ref('/products').once('value').then(res => {
      const carts: Product[] = [];
      res.forEach(e => {
        const val = e.val();
        let product: Product = { id: val.id, name: val.name, description: val.description, url: val.url, price: val.price };
        carts.push(product);
      });
      dispatch(homeAction.getProduct(carts));
    });

    AsyncStorage.getItem(`carts[${email}]`).then((cartsJson: any) => {
      if (cartsJson) {
        const carts = JSON.parse(cartsJson) as Product[];
        const number = carts.length;
        dispatch(cartAction.updateCart(carts, number));
      }
    });
  }, [email, isLogged]);

  return (
    <ScrollView>
      {
        (product && product.length > 0) ? product.map(e => (
          <React.Fragment key={e.id}>
            <ProductItem product={e} />
          </React.Fragment>
        ))
          : <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default React.memo(HomeScreen);
