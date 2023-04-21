import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CalendarView from './src/Components/CalendarView';
import FoodForm from './src/Components/FoodForm';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CalendarView" component={CalendarView} />
        <Stack.Screen name="FoodForm" component={FoodForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
