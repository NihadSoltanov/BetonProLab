import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from 'src/domain/models/navigation';
import { ROUTES } from './routes';
import { HomeScreen } from 'src/screens/Home';
import { LoginScreen } from 'src/screens/Login';
import { OngoingOrderScreen } from 'src/screens/OngoingOrder';
import { OrderHistoryScreen } from 'src/screens/OrderHistory';
import { loadString } from 'src/utils/appStorage';
import { useAuth } from 'src/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterScreen } from 'src/screens/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AppNavigator = () => {
    const { authData, loading } = useAuth();

return (
    <Stack.Navigator>
        {authData ? (
            <>
                <Stack.Screen
                    name={ROUTES.Home}
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={ROUTES.OngoingOrder}
                    component={OngoingOrderScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={ROUTES.OrderHistory}
                    component={OrderHistoryScreen}
                    options={{ headerShown: false }}
                />
            </>
        ) : (
            <>
                <Stack.Screen
                    name={ROUTES.Login}
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name={ROUTES.Register}
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
            </>
        )}
    </Stack.Navigator>
);

};
