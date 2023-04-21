import React, { useEffect, useState } from 'react';
import { View, Text, CheckBox, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FoodForm({route , navigation}) {
  const {selectedDate} = route.params

  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);
  let days =0;

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
          if(foodData.breakfast == false && foodData.lunch == false && foodData.dinner == false){
            data.splice(index,1)
          }else{
            data[index] = foodData;
          }
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
      finally{
        const daysDta = await AsyncStorage.getItem('foodData')
        days = await JSON.parse(daysDta)
        console.log(days)
      }
      navigation.navigate('CalendarView',{days : days.length});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select the meals you had today</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, breakfastChecked && styles.checkboxChecked]}
            onPress={() => setBreakfastChecked(!breakfastChecked)}
          >
            <Text style={[styles.checkboxLabel,breakfastChecked && styles.checkboxChecked]}>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, lunchChecked && styles.checkboxChecked]}
            onPress={() => setLunchChecked(!lunchChecked)}
          >
            <Text style={[styles.checkboxLabel,lunchChecked && styles.checkboxChecked]}>Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, dinnerChecked && styles.checkboxChecked]}
            onPress={() => setDinnerChecked(!dinnerChecked)}
          >
            <Text style={[styles.checkboxLabel , dinnerChecked && styles.checkboxChecked]}>Dinner</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveFoodData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE8B0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: '100%',
    backgroundColor: '#F97B22',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  checkboxContainer: {
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#F97B22',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  checkboxLabel: {
    color: '#F97B22',
    fontSize: 16,
    fontWeight: 'bold',
    },
    checkboxChecked: {
    backgroundColor: '#F97B22',
    color: '#FEE8B0',
    },
    saveButton: {
    backgroundColor: '#F97B22',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    },
    saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    },
    });