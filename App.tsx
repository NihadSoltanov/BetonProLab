import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { AppNavigator } from 'src/navigation/App.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'src/api/react-query-lib';
import ErrorBoundary from 'react-native-error-boundary'
import { CustomFallback } from 'src/components/Message/LAErrorMessage';
import { useFonts } from "expo-font";
import './src/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from 'src/contexts/Auth';
import { FilterContext, FilterProvider } from 'src/contexts/Filter';
import { FilterData } from 'src/domain/models/FilterContextData';



export default function App() {

  const [isLoaded] = useFonts({
    'Poppins-Black': require("./assets/fonts/Poppins-Black.ttf"),
  });
  
  if (!isLoaded) {
    return null;
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
     <ErrorBoundary FallbackComponent={CustomFallback}>
     <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex:1}}>
    <SafeAreaProvider>
      <NavigationContainer>
      <AuthProvider>
        <FilterProvider>
        <AppNavigator />
        <StatusBar />
        </FilterProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
    </GestureHandlerRootView>
    </QueryClientProvider>
    </ErrorBoundary>
    </Suspense>
  );
}
