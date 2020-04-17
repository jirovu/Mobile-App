import React from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import registerImg from "../../../assets/images/register.png";
import colors from '../styles/colors';
import strings from '../styles/strings';
import FormTextInput from './FormTextInput';
import LoginButton from './LoginButton';
import { db } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

interface Props {

}

const onRegisterSpress = (nav: any, email: string, password: string) => {
  db.ref('/items').push({ email, password }).then(res => {
    Snackbar.show({
      text: 'Register successfully!',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'UNDO',
        textColor: 'green',
      },
    });
    nav.navigate('User', { screen: 'Login' });
  })
    .catch(err => {
      Snackbar.show({
        text: 'Something went wrong!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'red',
        },
      });
    });
};

const RegisterScreen: React.FC<Props> = (props: Props) => {
  const passwordInputRef = React.useRef<any>();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = React.useState<string>('');
  const [emailTouched, setEmailTouched] = React.useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = React.useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = React.useState<string>('');
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState<string>('');
  const nav = useNavigation();

  const handleEmailChange = (email: string) => {
    if (emailTouched && email === '') {
      setEmailErrorMsg(strings.EMAIL_REQUIRED);
    } else if (emailErrorMsg !== '') {
      setEmailErrorMsg('');
    }
    setEmail(email);
  }

  const handlePasswordChange = (pass: string) => {
    if (passwordTouched && pass === '') {
      setPasswordErrorMsg(strings.PASSWORD_REQUIRED);
    } else if (passwordErrorMsg !== '') {
      setPasswordErrorMsg('');
    }
    setPassword(pass);
  }

  const handlePasswordRepeatChange = (passRepeat: string) => {
    setPasswordRepeat(passRepeat);
  }

  const handleEmailSubmitPress = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleEmailBlur = () => setEmailTouched(true);
  const handlePasswordBlur = () => setPasswordTouched(true);

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.form}>
        <Image source={registerImg} style={styles.logo} />
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
        />
        <FormTextInput
          ref={passwordInputRef}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={strings.PASSWORD_PLACEHOLDER}
          secureTextEntry={true}
          returnKeyType="next"
          onBlur={handlePasswordBlur}
          error={passwordErrorMsg}
        />
        <FormTextInput
          value={passwordRepeat}
          onChangeText={handlePasswordRepeatChange}
          placeholder={strings.PASSWORD_REPEAT_PLACEHOLDER}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <LoginButton
          label={strings.REGISTER}
          onPress={() => onRegisterSpress(nav, email, password)}
          disabled={!email || !password || !passwordRepeat || passwordRepeat !== password}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "50%",
    resizeMode: "contain",
    alignSelf: "center",
    maxHeight: '40%'
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default React.memo(RegisterScreen);
