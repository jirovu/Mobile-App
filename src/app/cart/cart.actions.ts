import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import { cartActionCreator, Product } from './cart.state';

class CartAction {
  addToCart = (product: Product) => {
    return (dispatch: Dispatch<any>, getState: any) => {
      const carts = getState().cart.carts as Product[];
      const isExisted = carts.some(p => p.id === product.id);
      if (!isExisted) {
        dispatch({
          type: cartActionCreator.ADD_TO_CART,
          payload: product
        })
      }
    }
  }

  removeFromCart = (id: number) => {
    return (dispatch: Dispatch<any>, getState: any) => {
      const carts = getState().cart.carts as Product[];
      const newCarts = carts.filter(p => p.id !== id);
      const number = newCarts.length;
      const cartsJson = JSON.stringify(newCarts);
      AsyncStorage.setItem('carts', cartsJson).then(() => {
        dispatch({
          type: cartActionCreator.REMOVE_FROM_CART,
          payload: { newCarts, number }
        })
      });
    }
  }

  updateCart = (carts: Product[], number: number) => {
    return {
      type: cartActionCreator.UPDATE_CART,
      payload: { carts, number }
    }
  }
}

export const cartAction = new CartAction();
