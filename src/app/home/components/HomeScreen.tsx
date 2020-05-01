import React, { useEffect } from 'react';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { RootState } from '../../store.config';
import { db } from '../../firebase.config';
import { Product } from '../../cart/cart.state';
import { useDispatch, useSelector } from 'react-redux';
import { homeAction } from '../home.actions';
import ProductItem from './ProductItem';
import { ScrollView } from 'react-native-gesture-handler';

interface Props { }

const HomeScreen: React.FC<Props> = () => {

  const dispatch = useDispatch<any>();
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
  }, []);

  return (
    <ScrollView>
      {
        (product && product.length > 0) ? product.map(e => <ProductItem product={e} />)
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
