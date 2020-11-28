import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text} from "react-native-elements"; 
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SwitchSelector from "react-native-switch-selector";
import {Button} from 'react-native-elements'; 
import { gql } from 'apollo-boost';
import { Platform } from 'react-native';
import {GET_DATING_POOL,GET_CONTACT_POOL} from './ProfilePool'; 

// addNewContact(userInput: UserInput1!): Boolean!

const ADD_NEW_CONTACT = gql`
 mutation namer($userInput: UserInput1!){
      addNewContact(userInput:$userInput)
 }
`





export default function NewContact({navigation,route}){
      
 
 const data1 = {name:"zaid shaikh", firstname:"zaid", countryCode:"+1", gender: "male", orientation:"male",minAge:24, maxAge:24,inches:"11", feet:"5", addToDatingPool:'yes', number:"2103888163"}   
 const [addNewContact, {data}] = useMutation(ADD_NEW_CONTACT);
 const [selectedValue, setSelectedValue] = useState("java");
 const [age,selectAge] = useState({minAge:null, maxAge:null})
 const [feet,selectFeet] = useState()
 const [inches,setInches] = useState()
 const options = [
    { label: "yes", value: "yes" },
    { label: "No", value: "no" },
    
  ];
const [dial_code, setDialCode] = useState("+1");   
const [firstname,setFirstname] = useState();   
const [lastname,setLastname] = useState();
const [number,setNumber] = useState();
const [digits,setDigits] = useState();
const [gender,setGender] = useState(); 
const [orientation, setOrientation] = useState(); 
const [height, setHeight] = useState(); 
const [addDatingPool, setAddDatingPool] = useState(); 
const [countryCode, setCountryCode] = useState('US'); 

if(data){
     console.log(data); 
}
console.log(countryCode); 
console.log(digits)
console.log(firstname)
console.log(lastname)
console.log(number)
console.log(gender)
console.log(orientation)
console.log(age.maxAge)
console.log(height)
console.log(addDatingPool)
console.log(feet)
console.log(inches)
console.log(digits); 


const _sendToServer = () => {
 const serverObject = {
     countryCode:route.params ? route.params.code : "US", 
     digits:digits, 
     name:firstname+lastname, 
     firstname:firstname, 
     gender:gender, 
     orientation:orientation,
     minAge:age.minAge, 
     maxAge:age.maxAge,
     inches:inches, 
     feet:feet, 
     addToDatingPool:addDatingPool
 }   
 addNewContact({variables:{userInput:serverObject},refetchQueries:[{query:GET_DATING_POOL}, {query:GET_CONTACT_POOL}]});
 navigation.navigate('ProfilePool')
 
//  navigation.goBack();       
}

const _uploadContact = () => {
     const serverData = {firstname, lastname,number,gender, orientation,age,height,addDatingPool}; 

}
const _checkDisable = () => {
     if(firstname && lastname && digits && gender && age && orientation){
          return false; 
     }
     return true; 
}
return(
 <View style = {{flex:1}}>  
 <View style = {{flex:0.1}}>
 </View> 
<View style = {{flex:0.6}}>    
<ScrollView>    
<View style = {{flex:1, }}>
<View style = {{flex:0.1}}>

</View>
<View style = {{marginLeft:30, marginRight:30}}>
<Text h4 style = {{alignSelf:"center", marginBottom:10}}>New Contact</Text>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, justifyContent:"center", alignItems:"center", alignSelf:"center",backgroundColor:'grey',marginBottom:10}}>
<MaterialCommunityIcons name="account-plus" size={50} color="pink" />
</TouchableOpacity>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
<View style = {{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginBottom:30}}>
<Text style = {{fontWeight:"bold"}}>FIRSTNAME</Text>

<TextInput style = {{borderWidth:3,width:200, padding:10}} onChangeText = {(text) => setFirstname(text)} autoCorrect = {false} autoCapitalize = {'none'}></TextInput>

</View>
<View style = {{flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginBottom:30}}>
<Text style = {{fontWeight:"bold"}}>LASTNAME </Text>
<TextInput style = {{borderWidth:3,width:200,padding:10}} onChangeText = {(text) => setLastname(text)} autoCorrect = {false} autoCapitalize = {'none'}></TextInput>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
</View>
<View style = {{flexDirection:"row",alignItems:'center', marginBottom:30 }}>
<Text style = {{marginRight:20,padding:10,fontWeight:'bold'}}>
  Mobile  
</Text>
<TouchableOpacity style = {{flexDirection:'row', marginRight:20,  }} onPress = {() => navigation.navigate('CountryCodes')}>
    <Text style = {{borderWidth:2,padding:10,}}>
         {route.params ? "US" : "US" }
           {route.params ? "+1" : "+1"}
    </Text>
    <View style = {{borderWidth:2,padding:10}}>
    <FontAwesome5 name="caret-down" size={24} color="black" />
    </View>


</TouchableOpacity>
<TextInput style = {{width:'40%', borderWidth:1, marginRight:20,height:'100%',padding:10}} onChangeText = {(text) => setDigits(text)} keyboardType = {"numeric"}>

</TextInput>
</View>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}}/>
<View style = {{flexDirection:'row', marginLeft:30,justifyContent:'space-between',marginRight:30,alignItems:'center',marginBottom:30}}>
<Text style = {{flex:0.5,fontWeight:'bold'}}>Sex</Text>
<View style = {{flexDirection:'row',justifyContent:'space-between',flex:0.3,alignItems:'center'}}>
<TouchableOpacity onPress = {() => {setGender('female')}} style = {{borderWidth:gender == 'female' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="female" size={35} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress = {() => {setGender('male')}} style = {{borderWidth:gender == 'male' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="male" size={35} color="black" />
</TouchableOpacity>
</View>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
  
</View>
<View style = {{flexDirection:'row', marginLeft:30,justifyContent:'space-between',marginRight:30,alignItems:'center',marginBottom:30}}>
<Text style = {{flex:0.6,fontWeight:'bold'}}>Orientation</Text>
<View style = {{flexDirection:'row',justifyContent:'space-between',flex:0.4,alignItems:'center'}}>
<TouchableOpacity onPress = {() => {setOrientation('female')}} style = {{borderWidth:orientation == 'female' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="female" size={35} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress = {() => {setOrientation('male')}} style = {{borderWidth:orientation == 'male' ? 3:0, borderRadius:10,borderColor:'green' }}>
<FontAwesome name="male" size={35} color="black" />
</TouchableOpacity>
<TouchableOpacity onPress = {() => {setOrientation('bisexual')}} style = {{borderWidth:orientation == 'bisexual' ? 3:0, borderRadius:10,borderColor:'green' }}>
<Ionicons name="ios-people" size={35} color="black" />
</TouchableOpacity>
</View>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
  
</View>
<View style = {{flexDirection:'row', marginLeft:30, justifyContent:'space-between', alignItems:'center',marginBottom:30, zIndex:1000}}>
<Text style = {{fontWeight:'bold'}}>Age </Text>
<DropDownPicker
    items={[
        {label: '15 - 20 years', value: {minAge:15,maxAge:20}, },
        {label: '20 - 25 years', value: {minAge:20,maxAge:25} },
        {label: '25 - 30 years', value: {minAge:25,maxAge:30} },
        {label: '30 - 35 years', value: {minAge:30,maxAge:35} },
        {label: '35 - 40 years', value: {minAge:35,maxAge:40}, },
        {label: '40 - 45 years', value: {minAge:40,maxAge:45}, },
        {label: '45 - 50 years', value: {minAge:45,maxAge:50}, },
    ]}
    placeholder = {"20 - 25 years "}
    containerStyle={{height: 40,width:200,zIndex:100}}
    style={{backgroundColor: '#fafafa',zIndex:100}}
    itemStyle={{
        justifyContent: 'flex-start', 
        zIndex:100
    }}
    dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
    onChangeItem={item => selectAge(
        item.value
    )}
/>
</View>
<View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30
  }}>
  
</View>
<View style = {{flexDirection:'row', marginLeft:30, justifyContent:'space-between', alignItems:'center',marginBottom:30, zIndex:500}}>
<Text style = {{fontWeight:'bold'}}>Height (optional) </Text>
<View style = {{flexDirection:'row',}}>
<DropDownPicker
    items={[
        {label: "4'", value: '4', },
        {label: "5'", value: '5', },
        {label: "6'", value: '6', },
        {label: "7'", value: '7', },
        {label: "8'", value: '8', },
    ]}
    placeholder = {"5'"}
    containerStyle={{height: 40,width:75}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => selectFeet(
        item.value
    )}
/>
<DropDownPicker
    items={[
        {label: '0"', value: '0', },
        {label: '1"', value: '1', },
        {label: '2"', value: '2', },
        {label: '3"', value: '3', },
        {label: '4"', value: '4', },
        {label: '5"', value: '5', },
        {label: '6"', value: '6', },
        {label: '7"', value: '7', },
        {label: '8"', value: '8', },
        {label: '9"', value: '9', },
        {label: '10"', value: '10', },
        {label: '11"', value: '11', },
        
    ]}
    placeholder = {'0"'}
    containerStyle={{height: 40,width:100}}
    style={{backgroundColor: '#fafafa', zIndex:100}}
    itemStyle={{
        justifyContent: 'flex-start',
        zIndex:100
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => setInches(
        item.value
    )}
/>
</View>
</View>
<View style = {{borderBottomWidth:3, marginLeft:30, marginRight:30, marginBottom:30}} zIndex = {100}/>
<View  style = {{flexDirection:'row', alignItems:'center',justifyContent:'space-between',marginLeft:30, marginRight:30,marginBottom:30,}} zIndex = {1}>

</View>

</View>
</View>
</ScrollView>
</View>
<View style = {{flex:0.2}}>
 <Button 
 onPress = {() => {_sendToServer()}}
 title = {"save"} containerStyle = {{marginLeft:30, marginRight:30,marginTop:100,backgroundColor:'black'}}
 disabled = {_checkDisable() }
 buttonStyle = {{backgroundColor:"black"}}
 >

 </Button>
</View>
</View>
)
}