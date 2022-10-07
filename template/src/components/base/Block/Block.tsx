import React, {memo} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {BlockProps} from './Block.props';
import equals from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';

const getView = (
  onPress?: () => void,
  disabled?: boolean,
  styleComponent?: StyleProp<ViewStyle>,
  rest?: any,
  children?: React.ReactNode,
  colorsGradient?: string[],
) => {
  if (onPress) {
    if (colorsGradient) {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={disabled}
          onPress={onPress}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={colorsGradient}
            style={styleComponent}
            {...rest}>
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={disabled}
        onPress={onPress}
        style={styleComponent}
        {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
  if (colorsGradient) {
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={colorsGradient}
      style={styleComponent}
      {...rest}>
      {children}
    </LinearGradient>;
  }
  return (
    <View style={styleComponent} {...rest}>
      {children}
    </View>
  );
};

const BlockComponent = (props: BlockProps) => {
  const {
    block,
    disabled,
    margin,
    marginLeft,
    alignItems,
    alignSelf,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    direction,
    padding,
    paddingHorizontal,
    paddingVertical,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    color,
    justifyContent,
    middle,
    center,
    row,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingTop,
    borderRadius,
    shadow,
    flex,
    shadowConfig,
    position,
    flexWrap,
    left,
    right,
    bottom,
    top,
    zIndex,
    overflow,
    borderBottomWidth,
    borderEndWidth,
    borderLeftWidth,
    borderRightWidth,
    borderStartWidth,
    borderTopWidth,
    borderBottomColor,
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderEndColor,
    borderLeftColor,
    borderRightColor,
    borderStartColor,
    borderStyle,
    borderTopColor,
    borderTopEndRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    opacity,
    textAlign,
    style = {},
    children,
    onPress,
    colorsGradient,
    ...rest
  } = props;

  const styleComponent =
    // () =>
    //   enhance([
    [
      textAlign && {textAlign},
      margin && {margin},
      marginLeft && {marginLeft},
      marginRight && {marginRight},
      marginTop && {marginTop},
      marginBottom && {marginBottom},
      marginVertical && {marginVertical},
      marginHorizontal && {marginHorizontal},
      direction && {flexDirection: direction},
      padding && {padding},
      paddingRight && {paddingRight},
      paddingBottom && {paddingBottom},
      paddingLeft && {paddingLeft},
      paddingTop && {paddingTop},
      paddingHorizontal && {paddingHorizontal},
      paddingVertical && {paddingVertical},
      width && {width},
      height && {height},
      border && {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
      },
      borderWidth && {borderWidth},
      borderColor && {borderColor},
      color && {backgroundColor: color},
      justifyContent && {justifyContent},
      middle && {alignItems: 'center'},
      center && {alignItems: 'center', justifyContent: 'center'},
      row && {flexDirection: 'row'},
      alignItems && {alignItems},
      alignSelf && {alignSelf},
      borderRadius && {borderRadius},
      flex && {flex},
      shadow && {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        ...shadowConfig,
      },
      position && {position},
      flexWrap && {flexWrap},
      left && {left},
      right && {right},
      bottom && {bottom},
      top && {top},
      zIndex && {zIndex},
      overflow && {overflow},
      borderBottomWidth && {borderBottomWidth},
      borderEndWidth && {borderEndWidth},
      borderLeftWidth && {borderLeftWidth},
      borderRightWidth && {borderRightWidth},
      borderStartWidth && {borderStartWidth},
      borderTopWidth && {borderTopWidth},
      borderBottomColor && {borderBottomColor},
      borderBottomEndRadius && {borderBottomEndRadius},
      borderBottomLeftRadius && {borderBottomLeftRadius},
      borderBottomRightRadius && {borderBottomRightRadius},
      borderBottomStartRadius && {borderBottomStartRadius},
      borderEndColor && {borderEndColor},
      borderLeftColor && {borderLeftColor},
      borderRightColor && {borderRightColor},
      borderStartColor && {borderStartColor},
      borderStyle && {borderStyle},
      borderTopColor && {borderTopColor},
      borderTopEndRadius && {borderTopEndRadius},
      borderTopLeftRadius && {borderTopLeftRadius},
      borderTopRightRadius && {borderTopRightRadius},
      borderTopStartRadius && {borderTopStartRadius},
      opacity && {opacity},
      style,
    ] as StyleProp<ViewStyle>;
  //   ]),
  // [props],
  return getView(
    onPress,
    disabled,
    styleComponent,
    rest,
    children,
    colorsGradient,
  );
};
export const Block = memo(BlockComponent, equals);
