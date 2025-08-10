import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AgentChatScreen } from './src/screens/AgentChatScreen';
import { AgentHomeScreen } from './src/screens/AgentHomeScreen';
import { AgentsListScreen } from './src/screens/AgentsListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' },
        }}
      >
        <Stack.Screen name="AgentsList" component={AgentsListScreen} />
        <Stack.Screen name="AgentHome" component={AgentHomeScreen} />
        <Stack.Screen name="AgentChat" component={AgentChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
