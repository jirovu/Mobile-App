import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.config';
import { db } from '../../firebase.config';
import { Product } from '../cart.state';

interface Props { }

const getCartItem = async (cartId: number, cart: Product[]) => {

}

const CartScreen: React.FC<Props> = (props: Props) => {

  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.login);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    // if (user && user.isLogged) {
    //   db.ref('/users').orderByChild('email').equalTo(user.email).once('value', res => {
    //     if (res.exists()) {
    //       const carts: Product[] = [];
    //       res.forEach(e => {
    //         let product: Product = { id: 0, name: '', description: '', img: '', price: '' };
    //         db.ref('/users').orderByChild('carts').once('value', s => {
    //           if (s.exists()) {
    //             s.forEach(e => {
    //               const val = e.val();
    //               product = { id: val.id, name: val.name, img: val.img, price: val.price, description: val.description };
    //               console.log(product);
    //               carts.push(product);
    //             });
    //           }
    //         });
    //       });
    //     }
    //   }).then(res => console.log(res));
    // }
  });

  useEffect(() => {

  }, [cart]);

  return (
    <>
      <Text>This is cart</Text>
    </>
  );
};

export default React.memo(CartScreen);
