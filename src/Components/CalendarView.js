import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarView({navigation}) {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    navigation.navigate('FoodForm', { selectedDate : day.dateString });
  };

  return (
    <View>
      <Calendar onDayPress={onDayPress} />
      <Text>You selected: {selectedDate}</Text>
    </View>
  );
}