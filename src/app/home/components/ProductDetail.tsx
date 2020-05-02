import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../cart/cart.state';
import { cartAction } from '../../cart/cart.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.config';

interface Props {

}

const ProductDetail: React.FC<Props> = (props: Props) => {

  const nav = useNavigation();
  const route = useRoute();
  const product = route.params as Product;
  const isCart = (route.params as any).isCart as boolean;
  const dispatch = useDispatch<any>();
  const isLogged = useSelector((state: RootState) => state.login.isLogged);

  const addToCart = () => {
    dispatch(cartAction.addToCart(product));
  }

  const goToLoginScreen = () => {
    nav.navigate('Login');
  }

  const removeFromCart = () => {
    dispatch(cartAction.removeFromCart(product.id));
    nav.navigate('Cart', { screen: 'Cart Product' });
  }

  return <>
    <ScrollView>
      {
        product ?
          <View style={styles.container}>
            <ScrollView>
              <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                <Image style={styles.productImg} source={{ uri: product.url }} />
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{`${product.price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>
              <View style={styles.separator}></View>
              {
                (!isCart) &&
                <View style={styles.addToCarContainer}>
                  <TouchableOpacity style={styles.shareButton} onPress={() => isLogged ? addToCart() : goToLoginScreen()}>
                    {
                      isLogged ?
                        <Text style={styles.shareButtonText}>Add To Cart</Text>
                        : <Text style={styles.shareButtonText}>Login To Buy</Text>
                    }
                  </TouchableOpacity>
                </View>
              }
              {
                isCart &&
                <View style={styles.addToCarContainer}>
                  <TouchableOpacity style={styles.shareButton} onPress={removeFromCart}>
                    <Text style={styles.shareButtonText}>Remove From Cart</Text>
                  </TouchableOpacity>
                </View>
              }
            </ScrollView>
          </View>
          : <View style={[styles.containerAct, styles.horizontalAct]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      }
    </ScrollView>
  </>
}

const styles = StyleSheet.create({
  containerAct: {
    flex: 1,
    justifyContent: "center"
  },
  horizontalAct: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: 'bold'
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30
  }
});

export default React.memo(ProductDetail);
