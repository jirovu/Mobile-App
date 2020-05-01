import { homeActionCreator } from './home.state';
import { Product } from './../cart/cart.state';

class HomeAction {
  getProduct = (product: Product[]) => {
    return {
      type: homeActionCreator.GET_PRODUCT,
      payload: product
    }
  }
}

export const homeAction = new HomeAction();
