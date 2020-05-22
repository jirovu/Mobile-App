import { Dispatch } from 'redux';
import { loginActionCreator, LoginState } from './login.state';
import { AsyncStorage } from 'react-native';

class LoginAction {

  changePassword = (email: string, newPassword: string) => {
    AsyncStorage.setItem('user', `${email}:${newPassword}`);
    return {
      type: loginActionCreator.CHANGE_PASSWORD,
      payload: { email, password: newPassword }
    }
  }

  login = (user: LoginState) => {
    AsyncStorage.setItem('user', `${user.email}:${user.password}`);
    return {
      type: loginActionCreator.LOGIN,
      payload: user
    }
  }

  logout = () => {
    return (dispatch: Dispatch<any>, getState: any) => {
      const currentUser = getState().login;
      AsyncStorage.removeItem('user');
      dispatch({
        type: loginActionCreator.LOGOUT
      });
    }
  }
}

export const loginAction = new LoginAction();
