import { ProductState, homeState } from './home/home.state';
import {
  combineReducers,
  Middleware,
  StoreEnhancer,
  applyMiddleware,
  createStore,
  compose,
  Dispatch,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Action } from './actions.config';
import { LoginState, loginReducer } from './login/login.state';
import { CartState, cartState } from './cart/cart.state';

const logger = createLogger();

export interface DefaultMapStateToProps {
  dispatch?: Dispatch<any>;
}

// Root States
export interface RootState {
  login: LoginState;
  cart: CartState;
  product: ProductState;
}

// Root Reducers
const rootReducers = {
  login: loginReducer,
  cart: cartState,
  product: homeState,
};

let middlewares: Middleware[] = [thunk as ThunkMiddleware<RootState, Action>];
middlewares.push(logger);

const enhancers: StoreEnhancer<any>[] = [applyMiddleware(...middlewares)];
const appReducer = combineReducers<RootState>(rootReducers);

/**
 * -------------------------------
 * Create Store
 * -------------------------------
 */
export const appStore = createStore(
  appReducer,
  {},
  (compose as any)(...enhancers),
);
