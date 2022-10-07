import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import Svgs from 'src/assets/svgs/Svgs';
import navigationService from 'src/navigation/navigationService';
import DeviceInfomation from 'src/utils/DeviceHelpers';
import {COLOR_TEXT_SCREEN_TITLE} from '../styles/common';
import {Block} from './Block/Block';

type Props = {
  title?: string;
  type?: 'LAYOUT_1' | 'LAYOUT_2';
  leftIconsConfig?: {
    icon: JSX.Element;
    onPress: () => void;
  }[];
  rightIconsConfig?: {
    icon: JSX.Element;
    onPress: () => void;
  }[];
};

const Layout1 = ({
  title,
  leftIconsConfig = [
    {icon: <Svgs.IcBack />, onPress: () => navigationService.goBack()},
  ],
  rightIconsConfig,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title || ''}
        </Text>
      </View>

      <Block direction="row">
        {leftIconsConfig &&
          leftIconsConfig.map((item, idx) => {
            return (
              <TouchableOpacity
                key={`${idx}`}
                onPress={() => item.onPress()}
                style={styles.backButton}>
                {item.icon}
              </TouchableOpacity>
            );
          })}
      </Block>

      <Block direction="row">
        {rightIconsConfig &&
          rightIconsConfig.map((item, idx) => {
            return (
              <TouchableOpacity
                key={`${idx}`}
                onPress={() => item.onPress()}
                style={styles.backButton}>
                {item.icon}
              </TouchableOpacity>
            );
          })}
      </Block>
    </SafeAreaView>
  );
};

const Layout2 = ({
  title,
  leftIconsConfig = [
    {icon: <Svgs.IcBack />, onPress: () => navigationService.goBack()},
  ],
  rightIconsConfig = [],
}: Props) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Block width={'100%'}>
        <Block direction="row" justifyContent="space-between">
          <Block direction="row">
            {leftIconsConfig &&
              leftIconsConfig.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={`${idx}`}
                    onPress={() => item.onPress()}
                    style={styles.backButton}>
                    {item.icon}
                  </TouchableOpacity>
                );
              })}
          </Block>

          <Block direction="row">
            {rightIconsConfig &&
              rightIconsConfig.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={`${idx}`}
                    onPress={() => item.onPress()}
                    style={styles.backButton}>
                    {item.icon}
                  </TouchableOpacity>
                );
              })}
          </Block>
        </Block>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 28,
            fontWeight: '700',
            marginLeft: 16,
            color: COLOR_TEXT_SCREEN_TITLE,
          }}>
          {title || ''}
        </Text>
      </Block>
    </SafeAreaView>
  );
};

const DefaultTitleActionBar = (props: Props): React.ReactElement => {
  if (props.type === 'LAYOUT_1') {
    return Layout1(props);
  }
  if (props.type === 'LAYOUT_2') {
    return Layout2(props);
  }
  return <Block />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: (DeviceInfomation.statusBarHeight || 0) + 8,
    marginBottom: 8,
  },
  backButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'stretch',
    color: COLOR_TEXT_SCREEN_TITLE,
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'center',

    left: 40,
    right: 40,
    bottom: 2,
    height: '100%',
    // padding: 16,
  },
  search: {
    paddingRight: 16,
    paddingTop: 2,
  },
  txtDone: {
    marginRight: 20,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default DefaultTitleActionBar;
