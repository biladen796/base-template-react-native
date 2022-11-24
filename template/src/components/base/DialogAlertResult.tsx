/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal, {ModalPortal, ScaleAnimation} from 'react-native-modals';
import Svgs from 'src/assets/svgs/Svgs';
import {Block} from 'src/components/base/Block/Block';
import {
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SCREEN_TITLE,
  COLOR_TEXT_SECONDARY,
} from 'src/components/styles/common';

const widthScreen = Dimensions.get('window').width;
const height = 0.9 * widthScreen;

export interface Button {
  text?: string;
  onPress?: () => void;
  styleText?: TextStyle;
}

interface Options {
  children?: React.ReactNode;
  onDismiss?: () => void;
  cancelable?: boolean;
}

export enum AlertType {
  Error = 1,
  Success = 2,
  Warning = 3,
  Confirm = 4,
  Info = 5,
}

export default class DialogAlertPortal {
  static show(
    alertType?: AlertType,
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    const {children} = options;

    function onPressActionButton(button: Button) {
      let onPress: () => void = () => null;
      if (button && button.onPress && typeof button.onPress === 'function') {
        onPress = button.onPress;
      }
      dismissDialog(onPress);
    }

    function dismissDialog(callback: () => void = () => null) {
      ModalPortal.dismissAll();
      typeof callback === 'function' && callback();
    }

    function onDismiss() {
      if (
        options &&
        options.onDismiss &&
        typeof options.onDismiss === 'function'
      ) {
        options.onDismiss();
      }
    }

    function onHardwareBackPress() {
      if (
        options &&
        (options.cancelable === true || options.cancelable === undefined)
      ) {
        dismissDialog();
      }
      return true;
    }

    ModalPortal.show(
      <Modal
        useNativeDriver
        visible={true}
        width={0.9}
        onDismiss={onDismiss}
        // onTouchOutside={() => onTouchOutside()}
        onHardwareBackPress={() => onHardwareBackPress()}
        modalAnimation={new ScaleAnimation()}
        modalTitle={
          title ? (
            <View style={styles.titleContainer}>
              {alertType === AlertType.Error && (
                <View style={[styles.iconContainer, styles.center]}>
                  <Svgs.IcError width={25} height={25} />
                </View>
              )}
              {alertType === AlertType.Success && (
                <View style={[styles.iconContainer, styles.center]}>
                  <Svgs.IcSuccess width={25} height={25} />
                </View>
              )}
              {alertType === AlertType.Warning && (
                <View style={[styles.iconContainer, styles.center]}>
                  <Svgs.IcWarning width={25} height={25} />
                </View>
              )}
              {alertType === AlertType.Info && (
                <View style={[styles.iconContainer, styles.center]}>
                  <Svgs.IcInfor width={25} height={25} />
                </View>
              )}
              <Text style={styles.title}>{title}</Text>
            </View>
          ) : null
        }>
        <View style={styles.container}>
          {message ? <Text style={[styles.message]}>{message}</Text> : null}

          {buttons && buttons.length === 1 && (
            <TouchableOpacity
              onPress={() => onPressActionButton(buttons[0])}
              style={[styles.button]}>
              <Text style={styles.buttonText}>{buttons[0].text}</Text>
            </TouchableOpacity>
          )}
          {buttons && buttons.length === 2 && (
            <Block direction="row">
              <TouchableOpacity
                onPress={() => onPressActionButton(buttons[0])}
                style={[styles.button, styles.flex_1]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: COLOR_TEXT_SECONDARY},
                    buttons[0].styleText ?? {},
                  ]}>
                  {buttons[0].text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPressActionButton(buttons[1])}
                style={[styles.button, {borderLeftWidth: 0, flex: 1}]}>
                <Text style={[styles.buttonText, buttons[1].styleText ?? {}]}>
                  {buttons[1].text}
                </Text>
              </TouchableOpacity>
            </Block>
          )}
          {!buttons ||
            (buttons && buttons.length === 0 && (
              <TouchableOpacity
                onPress={() => dismissDialog()}
                style={[styles.button]}>
                <Text style={styles.buttonText}>{`Đóng`}</Text>
              </TouchableOpacity>
            ))}

          {Boolean(children) && children}
        </View>
      </Modal>,
    );
  }

  static showSuccess(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertPortal.show(AlertType.Success, title, message, buttons, options);
  }

  static showInfo(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertPortal.show(AlertType.Info, title, message, buttons, options);
  }

  static showError(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertPortal.show(AlertType.Error, title, message, buttons, options);
  }

  static showWarning(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertPortal.show(AlertType.Warning, title, message, buttons, options);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: height / 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: COLOR_TEXT_SCREEN_TITLE,
    marginTop: 10,
    // fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR_TEXT_PRIMARY,
    marginTop: 14,
    // marginBottom: 18,
    width: '85%',
    textAlign: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    height: 45,
    marginTop: 16,
    borderWidth: 1,
    width: '100%',
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLOR_TEXT_SCREEN_TITLE,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'rgba(159, 159, 159, 0.05)',
    borderRadius: 35,
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  flex_1: {flex: 1},
});
