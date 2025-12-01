import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/domain/models/navigation";



export const useRootNavigation = () => useNavigation<StackNavigationProp<RootStackParamList>>();

export type RootStackParamListNavProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
  };
  