import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import loginImg from '../../../assets/images/login.png';
import FormTextInput from '../components/FormTextInput';
import colors from '../styles/colors';
import strings from '../styles/strings';
import LoginButton from './LoginButton';
import { db } from '../../firebase.config';
import { generateSnackbar } from './RegisterScreen';
import { useDispatch } from 'react-redux';
import { loginAction } from '../login.actions';
import { LoginState } from '../login.state';

interface Props { }

const LoginScreen: React.FC<Props> = (props) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [emailTouched, setEmailTouched] = React.useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = React.useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = React.useState<string>('');
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState<string>('');
  const nav = useNavigation();
  const passwordInputRef = React.useRef<any>();
  const dispatch = useDispatch<any>();

  const handleEmailChange = (email: string) => {
    if (emailTouched && email === '') {
      setEmailErrorMsg(strings.EMAIL_REQUIRED);
    } else if (emailErrorMsg !== '') {
      setEmailErrorMsg('');
    }
    setEmail(email);
  };

  const handlePasswordChange = (pass: string) => {
    if (passwordTouched && pass === '') {
      setPasswordErrorMsg(strings.PASSWORD_REQUIRED);
    } else if (passwordErrorMsg !== '') {
      setPasswordErrorMsg('');
    }
    setPassword(pass);
  };

  const handleEmailSubmitPress = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleEmailBlur = () => setEmailTouched(true);

  const handlePasswordBlur = () => setPasswordTouched(true);

  const handleLoginPress = () => {
    db.ref('/users').orderByChild('email').equalTo(email).once('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(e => {
          const dbPass = e.val().password;
          if (dbPass === password) {
            const user = { email, password, isLogged: true } as LoginState;
            dispatch(loginAction.login(user))
            nav.navigate('Home');
            generateSnackbar('Login successful', 'green');
          } else {
            generateSnackbar('Login failed', 'red');
          }
        })
      }
    })
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.form}>
        <Image source={loginImg} style={styles.logo} />
        <FormTextInput
          value={email}
          onChangeText={handleEmailChange}
          onSubmitEditing={handleEmailSubmitPress}
          placeholder={strings.EMAIL_PLACEHOLDER}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          onBlur={handleEmailBlur}
          error={emailErrorMsg}
          autoCapitalize="none"
        />
        <FormTextInput
          ref={passwordInputRef}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={strings.PASSWORD_PLACEHOLDER}
          secureTextEntry={true}
          returnKeyType="done"
          onBlur={handlePasswordBlur}
          error={passwordErrorMsg}
          autoCapitalize="none"
        />
        <LoginButton
          label={strings.LOGIN}
          onPress={handleLoginPress}
          disabled={!email || !password}
        />

        <Text
          style={styles.registerText}
          onPress={() => nav.navigate('User', { screen: 'Register' })}>
          Register new account!
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
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

export default React.memo(LoginScreen);
