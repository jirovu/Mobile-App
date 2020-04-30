import { Dispatch } from 'redux';
import { loginActionCreator, LoginState } from './login.state';
import { AsyncStorage } from 'react-native';

class LoginAction {
  login = (user: LoginState) => {
    AsyncStorage.setItem('email', user.email);
    return {
      type: loginActionCreator.LOGIN,
      payload: user
    }
  }

  logout = () => {
    return (dispatch: Dispatch<any>, getState: any) => {
      const currentUser = getState().login;
      dispatch({
        type: loginActionCreator.LOGOUT
      });
    }
  }
}

export const loginAction = new LoginAction();
