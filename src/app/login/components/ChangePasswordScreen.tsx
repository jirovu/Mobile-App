import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase.config';
import { RootState } from '../../store.config';
import colors from '../styles/colors';
import strings from '../styles/strings';
import FormTextInput from './FormTextInput';
import LoginButton from './LoginButton';
import { generateSnackbar } from './RegisterScreen';
import { loginAction } from '../login.actions';

interface Props { }

const ChangePasswordScreen = (props: Props) => {
  const passwordInputRef = React.useRef<any>();
  const { email } = useSelector((state: RootState) => state.login);
  const [password, setPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [newRepeatPassword, setNewRepeatPassword] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState('');
  const [newPasswordRepeatErr, setNewPasswordRepeatErr] = useState('');
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [newRepeatPasswordTouched, setNewRepeatPasswordTouched] = useState<boolean>(false);
  const { password: pass, isLogged } = useSelector((state: RootState) => state.login);
  const nav = useNavigation();
  const dispatch = useDispatch<any>();

  const handlePasswordChange = (pass: string) => {
    if (passwordTouched && pass === '') {
      setPasswordErr(strings.PASSWORD_REQUIRED);
    } else if (passwordErr !== '') {
      setPasswordErr('');
    }
    setPassword(pass);
  };

  const handleNewPasswordChange = (passRepeat: string) => setNewPassword(passRepeat);
  const handleNewRepeatPasswordChange = (newRepeatPassword: string) => setNewRepeatPassword(newRepeatPassword);
  const handlePasswordBlur = () => setPasswordTouched(true);
  const handleNewPasswordBlur = () => setNewPasswordTouched(true);

  const updatePassword = () => {
    db.ref('/users').orderByChild('email').equalTo(email.toLowerCase()).once('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          child.ref.update({ password: newPassword }).then((res) => {
            dispatch(loginAction.changePassword(email, newPassword));
            generateSnackbar('Update password successfully!', 'green');
            nav.navigate('User', { screen: 'Profile' });
          }).catch((err) => {
            generateSnackbar('Something went wrong!', 'green');
          });
        });
      } else {
        generateSnackbar('Email not exists', 'red');
      }
    });
  }

  return <>
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.form}>
        <FormTextInput
          ref={passwordInputRef}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={strings.PASSWORD_PLACEHOLDER}
          secureTextEntry={true}
          returnKeyType='next'
          onBlur={handlePasswordBlur}
          error={passwordErr}
        />
        <FormTextInput
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          placeholder={strings.PASSWORD_PLACEHOLDER}
          secureTextEntry={true}
          returnKeyType='next'
          onBlur={handleNewPasswordBlur}
          error={newPasswordErr}
        />
        <FormTextInput
          value={newRepeatPassword}
          onChangeText={handleNewRepeatPasswordChange}
          placeholder={strings.PASSWORD_REPEAT_PLACEHOLDER}
          secureTextEntry={true}
          returnKeyType='done'
        />
        <LoginButton
          label={strings.REGISTER}
          onPress={() => updatePassword()}
          disabled={
            !password ||
            !newPassword ||
            !newRepeatPassword ||
            newPassword === password ||
            newRepeatPassword === password ||
            newRepeatPassword !== newPassword ||
            password !== pass
          }
        />
      </View>
    </KeyboardAwareScrollView>
  </>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: '50%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  registerText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default React.memo(ChangePasswordScreen);
