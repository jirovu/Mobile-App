import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/store.config';
import Chevron from '../../shared/components/Chevron';
import { loginAction } from '../../login/login.actions';
import { generateSnackbar } from '../../login/components/RegisterScreen';

interface Props { }

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 15,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'gray',
    fontWeight: '500',
  },
});

const ProfileScreen: React.FC<Props> = (props) => {
  const { email } = useSelector((state: RootState) => state.login);
  const nav = useNavigation();
  const dispatch = useDispatch<any>();

  const onLogOut = () => {
    dispatch(loginAction.logout());
    generateSnackbar('You already logged out', 'green');
    nav.navigate('User', { screen: 'Login' });
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.userRow}>
        <View style={styles.userImage}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_the_Communist_Party_of_Vietnam.svg/1200px-Flag_of_the_Communist_Party_of_Vietnam.svg.png',
            }}
          />
        </View>
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View>
        <ListItem
          title="Change password"
          containerStyle={styles.listItemContainer}
          onPress={() => nav.navigate('User', { screen: 'Change Password' })}
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Logout"
          onPress={() => onLogOut()}
          containerStyle={styles.listItemContainer}
          rightIcon={{ name: 'flight-takeoff' }}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(ProfileScreen);
