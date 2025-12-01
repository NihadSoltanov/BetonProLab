import { FC } from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { styles } from './Button.styles';

export interface LAButtonProps {
    onPress: () => void;
    title: string;
    fontColor?: string;
    buttonColor?: string;
    buttonTitleWeight?: 'normal' | 'bold' | '400' | '700';
    titleSize?: number;
    borderColor?: string;
    borderThickness?: number;
    borderRadius?: number;
    style?: ViewStyle;
}

export const LAButton: FC<LAButtonProps> = ({
    onPress,
    title,
    fontColor,
    buttonColor,
    buttonTitleWeight,
    borderColor,
    titleSize,
    borderThickness,
    style,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.laButton,
                {
                    backgroundColor: buttonColor,
                    borderColor: borderColor,
                    borderWidth: borderThickness,
                },
                style,
            ]}>
            <Text
                style={[
                    styles.laButtonText,
                    {
                        color: fontColor,
                        fontWeight: buttonTitleWeight,
                        fontSize: titleSize,
                    },
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
