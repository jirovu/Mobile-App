import * as React from "react";
import { NativeSyntheticEvent, Platform, StyleSheet, Text, TextInput, TextInputFocusEventData, TextInputProps, View } from "react-native";
import colors from "../styles/colors";

type Props = TextInputProps & {
  error?: string;
};

interface State {
  isFocused: boolean;
}

class FormTextInput extends React.Component<Props, State> {
  textInputRef = React.createRef<TextInput>();

  readonly state: State = {
    isFocused: false
  };

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  render() {
    const { error, onFocus, onBlur, style, ...otherProps } = this.props;
    const { isFocused } = this.state;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          underlineColorAndroid={
            isFocused
              ? colors.DODGER_BLUE
              : colors.LIGHT_GRAY
          }
          style={styles.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...otherProps}
        />
        <Text style={styles.errorText}>{error || ""}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  textInput: {
    height: 40,
    ...Platform.select({
      ios: {
        borderColor: colors.SILVER,
        borderBottomWidth: StyleSheet.hairlineWidth
      },
      android: {
        paddingLeft: 6
      }
    })
  },
  errorText: {
    height: 20,
    color: colors.TORCH_RED,
    // ...and here as well
    ...Platform.select({
      android: {
        paddingLeft: 6
      }
    })
  }
});

export default React.memo(FormTextInput);
