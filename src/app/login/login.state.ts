import { Action } from '../actions.config';

export const loginActionCreator = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD'
}

export interface LoginState {
  email: string;
  password: string;
  isLogged: boolean;
}

export const initialLoginState: LoginState = {
  email: '',
  password: '',
  isLogged: false,
};

export const loginReducer = (state: LoginState = initialLoginState, action: Action) => {
  switch (action.type) {
    case loginActionCreator.LOGIN: {
      const user = action.payload as LoginState;
      return { ...state, ...user };
    }
    case loginActionCreator.LOGOUT: {
      return { ...state, email: '', password: '', isLogged: false };
    }
    case loginActionCreator.CHANGE_PASSWORD: {
      const { email, password } = action.payload;
      return { ...state, email, password };
    }
    default:
      return { ...state };
  }
};
