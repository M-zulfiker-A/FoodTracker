import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarView({route , navigation}) {
  const [selectedDate, setSelectedDate] = useState('');
  const [dayCounter , setDayCounter] = useState(0)
  const [Amount , setAmount] = useState(0)
  const days = route.params?.days ? route.params.days : 0;
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    navigation.navigate('FoodForm', { selectedDate : day.dateString });
  };

  useEffect(()=>{
    const fetchdays = async()=>{
       const data = await AsyncStorage.getItem('foodData')
       console.log(JSON.parse(data).length)
       setDayCounter(JSON.parse(data).length)
       if(dayCounter % 30 === 0 && dayCounter != 0){
          setAmount(2000)
       }else{
        setAmount(0)
       }
    }
    fetchdays()
    
  },[days , dayCounter])

  return (
    <View style={{ flex: 1, backgroundColor: '#FEE8B0', padding: 10 }}>
    <Calendar
      enableSwipeMonths
      onDayPress={onDayPress}
      theme={{
        backgroundColor: '#FEE8B0',
        textSectionTitleColor: 'black',
        calendarBackground: '#FEE8B0',
        selectedDayBackgroundColor: '#9CA777',
        selectedDayTextColor: 'black',
        todayTextColor: 'darkblue',
        dayTextColor: '#F97B22',
        textDayFontWeight: '900',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '700',
        textDisabledColor: 'gray',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
        monthTextColor : '#F97B22',
        
      }}
      markedDates={{
        [selectedDate]: {selected: true, selectedDotColor: 'orange'}
      }}
      
    />
    <Text style={{ fontWeight: 'bold', color: '#F97B22', marginTop: 10  , margin : 'auto'}}>Day Counter : {dayCounter % 30 || 30}</Text>
    <Text style={{ fontWeight: 'bold', color: '#F97B22', margin : 'auto'}}>Amount to be paid : {Amount}</Text>
  </View>
  );
}