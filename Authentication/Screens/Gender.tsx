import  React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements'; 
import {Header,Continue} from '../../src/common/Common'; 
import { mutateSettings } from '../../networking';
import { GET_DETAILS } from '../../Account/Screens/DetailsSettings';
import {firebase} from '../../config';

export default function Gender({navigation, route}){

const {page} = route.params;   

const _handlePage = () => {
 if(page == "DetailsSettings"){
    
    navigation.navigate("DetailsSettings")
    return; 
 }
 navigation.navigate('GenderPreference', {page:"something"})

}
const _handleServer = () => {
   if(man){
      //mutateSettings({gender:"male"}, [{query:GET_DETAILS}])
    const currentUser = firebase.auth().currentUser; 
    const db = firebase.firestore();
    db.collection('user').doc('trialUser').set({ gender:"male"}, {merge:true}).then(val => console.log)
      
   }
   else if(woman){
      const currentUser = firebase.auth().currentUser; 
   
    const db = firebase.firestore();
    
    
    db.collection('user').doc('trialUser').set({ gender:"female"}, {merge:true}).then(val => console.log)
    //mutateSettings({gender:"female"}, [{query:GET_DETAILS}]) 
   }
}


const [man,setMan] = useState(false);
const [woman, setWoman] = useState(false);
const manWidthColor = man ? "yellow":"black"; 
const womanWidthColor = woman ? "yellow":"black";  
const gateColor = man || woman ? "green" : "white"; 
const gateGuard = man || woman ? false: true; 



return(
<View style = {{flex:1,}}>
<View style = {{flex:0.2}}>
     
</View>
<View style = {{flex:0.5, marginLeft:50, marginRight:50}}>
<Header text = {"I identify as a...."}/>
<View  style = {{borderBottomWidth:0.5, width:Dimensions.get('window').width - 60,marginTop:20}}/>
<View style = {{flexDirection:"row", justifyContent:"space-around",marginTop:40 }}>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:manWidthColor, borderRadius:50}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40,  borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"black"}}
onPress = {() => {setMan(true), setWoman(false)}}
>
<Ionicons name="ios-man" size={60} color="white" />

</TouchableOpacity>

</TouchableOpacity>
<TouchableOpacity 
style = {{width:100, height:100, justifyContent:"center", alignItems:"center", backgroundColor:womanWidthColor, borderRadius:50}}
onPress = {() => {setWoman(true), setMan(false)}}
>
<TouchableOpacity style = {{height:80, width:80, borderRadius:40, borderColor:'black', borderWidth:0.3,justifyContent:"center", alignItems:"center",backgroundColor:"black"}}
onPress = {() => {setWoman(true), setMan(false)}} 
>
<Ionicons name="ios-woman" size={60} color="white" />
</TouchableOpacity>
</TouchableOpacity>
</View>
<View style = {{flexDirection:"row", justifyContent:"space-between", marginLeft:60, marginRight:50, marginTop:10}}>
<Text style = {{fontWeight:"700"}}>Man</Text>
<Text style = {{fontWeight:"700"}}>Woman</Text>
</View>
<View  style = {{borderBottomWidth:0.5, width:Dimensions.get('window').width - 60,marginTop:20}}/>
</View>
<View style = {{flex:0.3, justifyContent:"center", }}>
 {/* <Continue disabled = {gateGuard} backgroundColor = {gateColor} onPress = {() => {navigation.navigate('GenderPreference')}}/>     */}
 <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:50, marginRight:50}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {gateGuard}
  onPress = {() => {_handleServer(),_handlePage()}}
/>
</View>
</View>
)
}