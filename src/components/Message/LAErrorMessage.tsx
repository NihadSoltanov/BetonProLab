import { Button, Text, View } from "react-native";

export const CustomFallback = (props: { error: Error, resetError: Function }) => (
    <View>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
    </View>
  )