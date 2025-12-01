import { type FC } from 'react';
import {
  TouchableOpacity, View, Image, Text, type StyleProp, type ViewStyle, type ImageSourcePropType, type TextStyle, ImageStyle,
} from 'react-native';
import { styles } from './Button.styles';
import React from 'react';

interface LAMenuButtonProps{
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
  subTitle?:string;
  backgroundColorDisabled?: string;
  leftIcon?:  ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  leftImageStyle?: StyleProp<ImageStyle>;
  rightImageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?:StyleProp<TextStyle>;
  testID?: string;
  disabled?: boolean;
}


export const LAMenuButton:FC<LAMenuButtonProps> = ({
  accessibilityLabel,
  testID,
  style,
  title,
  subTitle,
  leftIcon,
  leftImageStyle,
  rightImageStyle,
  titleStyle,
  subTitleStyle,
  rightIcon,
  disabled,
  onPress,
}) => {



 return (
 <TouchableOpacity onPress={onPress} disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      style={style}
      activeOpacity={1}
      testID={testID}
      >
        <View style={styles.textContainer}>
        {leftIcon && (
            <Image style={leftImageStyle} source={leftIcon} />
        )}
        <View>
          <Text style={titleStyle}>{title}</Text>
          {
            subTitle && (
              <Text style={subTitleStyle}>{subTitle}</Text>
            )
          }
          </View>
          {rightIcon && (
            <Image style={rightImageStyle} source={rightIcon}/>
          )}
        </View>
      </TouchableOpacity>
);

};
