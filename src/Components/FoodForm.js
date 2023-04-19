import React, { useEffect, useState } from 'react';
import { View, Text, CheckBox, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FoodForm({route}) {
  const {selectedDate} = route.params

  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);

  useEffect(()=>{
    (async function(){
        const existing = await AsyncStorage.getItem('foodData');
        const data = existing ? JSON.parse(existing) :  [];
        console.log(data);
        const index = data.findIndex(item => item.date === selectedDate);
        if (index >= 0) {
            console.log(data[index]);
          // Update existing data for selected date
          data[index].breakfast && setBreakfastChecked(true) 
          data[index].lunch && setLunchChecked(true) 
          data[index].dinner && setDinnerChecked(true) 
        } 
    })();
  },[])

  const saveFoodData = async () => {
    const foodData = {
      date: selectedDate,
      breakfast: breakfastChecked,
      lunch: lunchChecked,
      dinner: dinnerChecked
    };

    try {
        const existingData = await AsyncStorage.getItem('foodData');
        const data = existingData ? JSON.parse(existingData) : [];
        const index = data.findIndex(item => item.date === selectedDate);
        if (index >= 0) {
          // Update existing data for selected date
          data[index] = foodData;
        } else {
          // Add new data for selected date
          data.push(foodData);
        }
        await AsyncStorage.setItem('foodData', JSON.stringify(data));
        const latest = await AsyncStorage.getItem('foodData');
        console.log(latest)
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <View>
      <Text>Selected Date: {selectedDate}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          value={breakfastChecked}
          onValueChange={() => {
            console.log("pressed");
            setBreakfastChecked(!breakfastChecked)}
          }
        />
        <Text style={{ marginLeft: 8 }}>Breakfast</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          value={lunchChecked}
          onValueChange={() => setLunchChecked(!lunchChecked)}
        />
        <Text style={{ marginLeft: 8 }}>Lunch</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          value={dinnerChecked}
          onValueChange={() => setDinnerChecked(!dinnerChecked)}
        />
        <Text style={{ marginLeft: 8 }}>Dinner</Text>
      </View>
      <Button title="Submit" onPress={saveFoodData} />
    </View>
  );
}
