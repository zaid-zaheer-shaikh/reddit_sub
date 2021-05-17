import  React, {useState,useRef,useEffect,useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {Continue,Header} from '../../src/common/Common'; 
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { mutateSettings} from '../../networking';
import {Button} from 'react-native-elements'; 
import { firebase } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../AppContext';
import {updateUser} from '../../networking';  

// @refresh reset
const auth = firebase.auth(); 

export default function Name({navigation}){
   const myContext = useContext(AppContext);   
   const { userId, CustomBackComponent,db  } = myContext; 
   useEffect(() => {
    navigation.setOptions({
      headerTitle:false, 
      headerLeft:false, 
    })
  }, [])
  

   
   
   const [firstName, setFirstName] = useState(""); 
   const [lastName, setLastName] = useState("");
   const [openGate, setOpenGate] = useState(true); 
   const [color, setColor] = useState("white")
   const [currentUser, setCurrentUser] = useState(); 
   const fire = () => {
     
    
    db.collection('user').doc(userId).set({firstName, lastName, name:firstName+lastName}, {merge:true}).then(() => {
      
      navigation.navigate('Birthday', {page:"something"})
      
    })
    
    
    } 
   
    
  

  

   const handleFirstNameChange = async (event) => {
    handleOpenGate()
    const {eventCount, target, text} = event.nativeEvent;
        console.log(text)
        setFirstName(text);  
        
   }
   const handleLastNameChange = async (event) => {
    handleOpenGate()
    const {eventCount, target, text} = event.nativeEvent;
    console.log(text)   
    setLastName(text);
        
}
   const handleOpenGate = async () => {
        if(firstName.length >= 1 && lastName.length >= 1 ){
        await setOpenGate(false);
        await setColor("green")
        return; 
        }
        await setOpenGate(true); 
        await setColor("white");
        
        
   }
   
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
      });
      
      if (!fontsLoaded) {
        return <Text>App is loading</Text>;
      }    
return(
<KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "padding"}>
<Header text = "My name is....." style = {{justifyContent:"center", alignItems: 'flex-start',marginLeft:30,marginTop:60, }}/>
<TextInput style = {{borderBottomWidth:0.5,opacity:0.3, borderColor:"grey",width:Dimensions.get('window').width -60, marginLeft:30 }}>

</TextInput>
<Text style = {{alignSelf:"flex-start", marginLeft:30,marginTop:10, fontFamily: 'Roboto_400Regular'}}>This is how it will appear to others</Text>
<TextInput style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60, marginLeft:30, marginTop:40 }} placeholder = {"First Name"} onChange = {async (text) => {await handleFirstNameChange(text)}} autoCorrect = {false} value = {firstName}>


</TextInput>
<TextInput style = {{fontSize:35, borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60, marginLeft:30, marginTop:30 }} placeholder = {"Last Name"} onChange = {async (text) => {await handleLastNameChange(text)} } autoCorrect = {false} value = {lastName}></TextInput>
<TextInput style = {{borderBottomWidth:0.3, borderColor:"grey",opacity:0.5, width:Dimensions.get('window').width -60, marginLeft:30, marginTop:30 }} ></TextInput>



 
 <Button
  title="Continue"

  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30,}}
  disabled = {openGate}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  // onPress = {() =>  fire()}
  onPress = {() => fire()}
  
/>       
 



</KeyboardAvoidingView>  
)
}