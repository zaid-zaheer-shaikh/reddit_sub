import React, { useState, useEffect, useRef, createContext, useContext, useCallback  } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppContext from '../../AppContext';
// @refresh reset
import DraggableFlatList, {
    RenderItemParams,
  } from 'react-native-draggable-flatlist'; 
import { FontAwesome } from '@expo/vector-icons';


interface SortProps {}
const NUM_ITEMS = 9;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const exampleData: Item[] = [
    
    {
     key:'namer', 
     label:'Creativity', 
     backgroundColor:'black'
    },
    {
        key:'namer1', 
        label:'Charisma', 
        backgroundColor:'black'
    },
    {
        key:'namer2', 
        label:'Honest', 
        backgroundColor:'black'
    },
    {
        key:'namer3', 
        label:'Looks', 
        backgroundColor:'black'
    },
    {
        key:'namer4', 
        label:'Empathetic', 
        backgroundColor:'black'
    },
    {
        key:'namer5', 
        label:'Humor', 
        backgroundColor:'black'
    },
    {
        key:'namer6', 
        label:'Status', 
        backgroundColor:'black'
    },
    {
        key:'namer7', 
        label:'Wealthy', 
        backgroundColor:'black'
    },


]

type Item = {
  key: string;
  label: string;
  backgroundColor: string;
};

const SelfSort = ({navigation, route}) => {
    const myContext = useContext(AppContext);
     
    const {selfFilter, setSelfFilter, CustomBackComponent} = myContext;
    const [sortData, setSortData] = useState([]); 


    
    
    
    
    


    useEffect(() => {
      
      if(Object.keys(selfFilter).length){
        const result = selfFilter.sortOrder.map(val => {
            return Object.assign({}, {key:val,label:val, backgroundColor:'black' }) 
            
         })
         setSortData(result); 
      }
      

    }, [])


    useEffect(() => {
      navigation.setOptions({
        headerTitle:false, 
        headerLeft:() => <CustomBackComponent navigation = {navigation}/>
      })
    }, [])

    useEffect(() => {
       if(sortData.length){
        const copy = JSON.parse(JSON.stringify(selfFilter))
        const result = sortData.map(val => val.label); 
        console.log("selected sort order")
        
        copy.sortOrder = result; 
        setSelfFilter(copy);
        

       }
    
       

    }, [sortData])


    

    const renderItem = useCallback(
      ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
        return (
          <View style = {{flexDirection:'row',backgroundColor: isActive ? 'red' : item.backgroundColor}}>
          <TouchableOpacity
            style={{
              flex:0.9,
              height: 100,
              backgroundColor: isActive ? 'red' : item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onLongPress={drag}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 32,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
          <FontAwesome name="sort" size={24} color={isActive ? 'red' : 'white'} style = {{alignSelf:'center'}} />
          </View>
        );
      },
      []
    );
  
    return (
      <View style={{ flex: 1 }}>
        <View style = {{height:50, alignItems:'center',justifyContent:'center'}}>
        <CustomBackComponent navigation = {navigation}/>
        </View>
        <DraggableFlatList
          data={sortData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => setSortData(data)}
        />
      </View>
    );
  }
  


export default SelfSort;

const styles = StyleSheet.create({
  container: {}
});
