import { FC } from "react";
import { Text, StyleProp, ViewStyle, TextStyle, Pressable, GestureResponderEvent } from "react-native";
import React from "react";
import styles from "./HomeScreen.styles";


interface ButtonGroupProps {
    onPress?(...args: any[]): void;
    selectedIndex?: number | null;
    selectedbuttonStyle?: StyleProp<ViewStyle>;
    title: string;
    isSelected?:boolean;
    onPressIn?: (event: GestureResponderEvent) => void;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
    onPress = () => null,
    selectedIndex = null,
    title,
    isSelected,
    selectedbuttonStyle,
    onPressIn
}) => {
 
  return (
    
    <Pressable
      onPressIn={onPressIn}
      onPress={()=>onPress(selectedIndex)}
      style={[styles.laGroupButton, isSelected && selectedbuttonStyle]}
    >
      <Text style={styles.laGroupButtonText}>{title}</Text>
    </Pressable>
  );
};
