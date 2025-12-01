import React, { Children, FC, ReactNode } from 'react';
import { Text, View } from 'react-native';
import styles from './InputContainer.styles';

export interface InputContainerProps {
    title: string;
    children: ReactNode;
}

export const InputContainer: FC<InputContainerProps> = ({
    title,
    children,
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{title}</Text>
            <View style={styles.dataContainer}>{children}</View>
        </View>
    );
};
