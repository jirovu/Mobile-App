import React from 'react';
import {Text} from 'react-native';

interface Props {}

const ChangePasswordScreen = (props: Props) => {
  return (
    <>
      <Text>This is change password screen</Text>
    </>
  );
};

export default React.memo(ChangePasswordScreen);
