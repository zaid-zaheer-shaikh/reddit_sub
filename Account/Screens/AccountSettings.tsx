import  React, {useState,useRef,useEffect,createRef, forwardRef, useContext} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, NavigatorIOS, Platform} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import SwitchSelector from "react-native-switch-selector";
import AppContext from '../../AppContext'; 
import {updateUser} from '../../networking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//import { mutateSettings } from '../../networking';
// @refresh reset
import { firebase} from '../../config'; 
import { gql } from 'apollo-boost';
import { Ionicons } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
const db = firebase.firestore(); 



export const GET_DETAILS = gql`
 query {
    getSettingsMutation{
       inches 
       feet
       gender
       job
       hometown

    }
 }

`




export default function AccountSettings({navigation}){
const insets = useSafeAreaInsets()   
const [matchmaking, setMatchmaking] = useState();   
const [value, setValue] = useState(1);
const [email, setEmail] = useState();
const myContext = useContext(AppContext);
const {user, userId,setInitialRouteName} = myContext;
const [defaultDistance, setDefaultDistance] = useState(40)
const [distancePreference, setDistancePreference] = useState(40);  
const [minAgePreference, selectMinAgePreference] = useState(); 
const [maxAgePreference, selectMaxAgePreference] = useState();
const [defaultDating, setDefaultDating] = useState(null)

const [genderPreference, setGenderPreference] = useState();  
const [minAgePref, selectminAgePref] = useState(); 
const [maxAgePref, selectmaxAgePref] = useState(); 
const slider = forwardRef; 
useEffect(() => {
 navigation.setOptions({
    headerTitle:'Account Settings', 
    headerLeft:false, 
    headerShown:false,
    headerRight:() => <TouchableOpacity onPress = {() => {_sendToServer(),navigation.navigate('Homer')}} style = {{marginRight:10}}>
    <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Done</Text>
    </TouchableOpacity>
   })
}, [])
useEffect(() => {

setDefaultDistance(user.distancePreference); 
setDistancePreference(user.distancePreference); 
selectMinAgePreference(user.minAgePreference); 
selectMaxAgePreference(user.maxAgePreference);
setDefaultDating(user.dating ? 1:0)


}, [user.distancePreference, user.minAgePreference, user.maxAgePreference, user.dating])
console.log(userId)

   //const {data, loading, error} = useQuery(GET_DETAILS);
   // if(data){

   // }
// useEffect(() => {
//    db.collection('user').doc('trialUser').onSnapshot((doc) => {
//       if(doc.data().email !== undefined){
//          setEmail(doc.data().email)
//       }
//        selectminAgePref(doc.data().minAgePref)
//        selectmaxAgePref(doc.data().maxAgePref)
//        setGenderPreference(doc.data().genderPreference)
//        setValue(doc.data().distancePreference)
//        if(doc.data().accountType == "matchmaking"){
//          setMatchmaking("yes")
//          return   
//        }
//        if(doc.data().accountType == "both"){
//          setMatchmaking("No")
//          return   
//        }

       
//    }) 
// }, [email])

 
    const options = [
        { label: "yes", value: true },
        { label: "No", value: false },
        
      ];


const changeValue = (value) => {
     const changed = parseInt(value); 
     setDistancePreference(changed); 
}


const onMinChange = (value) => {
 db.collection('user').doc(userId).set({minAgePreference:value}, {merge:true})
 .then(() => console.log('min age set'))
    
}
const onMaxChange = (value) => {
   db.collection('user').doc(userId).set({maxAgePreference:value}, {merge:true})
   .then(() => console.log('min age set'))   
}
const onSlidingComplete = (value) => {
    db.collection('user').doc(userId).set({distancePreference:parseInt(value)}, {merge:true}).then(() => console.log("value added")).catch(() => console.log("netwrok error"))
}

const handleGenderPreference = () => {
    if(genderPreference == "male"){
        return <FontAwesome name="male" size={30} color="black" /> 
    }
    else if(genderPreference == "female"){
      return <FontAwesome name="female" size={30} color="black" />
    }
    else if(genderPreference == "both"){
      return <Ionicons name="ios-people" size={30} color="black" />
    }
}

const _sendToServer = () => {
   //mutateSettings({maxDistance:value, minAgePreference:minAgePref, maxAgePreference:maxAgePref})
   if(matchmaking == "yes"){
       //mutateSettings({profileType:"matchmaking"})
   }
   else if(matchmaking == "no"){
      //mutateSettings({profileType:"matchmaking+dating"})
   }
   updateUser(userId, {distancePreference,minAgePreference,maxAgePreference})

}
 


if(defaultDating || defaultDating == 0){

   return(
      <View style = {{flex:1, backgroundColor:'white'}}>
      
      <View style = {{flex:1,marginLeft:30, marginRight:30,marginTop:Platform.OS == 'ios' ? insets.top:40, }}>
      <View style = {{flexDirection:'row', justifyContent:'space-between',marginBottom:50}}>
       <Text></Text>
       <Text style = {{fontWeight:'bold', fontSize:17,marginLeft:10}}>Account Settings</Text>  
       <TouchableOpacity onPress = {() => {_sendToServer(),setInitialRouteName('Settings'),navigation.navigate('Homer')}} style = {{marginRight:10}}>
          <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Done</Text>
          </TouchableOpacity>
      </View>   
      
      <View style = {{}}>
      <Text style = {styles.headerSection}>
          CONTACT INFO
      </Text>
      <View style = {{borderBottomWidth:2, marginTop:5 }}/>
      <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            MOBILE 
         </Text> 
         <Text style = {{fontWeight:"bold",fontSize:15}}>
             {user.formattedPhone}
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('ChangeNumber', {page:"AccountSettings"})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
         </TouchableOpacity>
      </View>
      {/* <View style={{
          borderStyle: 'dotted',
          borderWidth: 2,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:10,
          marginTop: 10,
       }}/> */}
        <DashedLine dashLength={4} dashThickness={2} dashGap={5} style = {{marginTop:10}}/>
      
      
      <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            EMAIL 
         </Text> 
         <Text style = {{fontWeight:"bold",fontSize:15}}>
             {user.email}
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('Email',{page:'AccountSettings'})}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
         </TouchableOpacity>
      </View>
      <Text style = {[styles.headerSection, {marginTop:40}]}>
          DISCOVERY
      </Text>
      <View style = {{borderBottomWidth:2, marginTop:5 }}/>
      <View style = {{flexDirection:"row", justifyContent:"space-between",marginTop:20, alignItems:"center"}}>
         <Text style = {{fontWeight:"600"}}>
            LOCATION 
         </Text> 
         
         <Text style = {{fontWeight:"bold",fontSize:15}}>
           My Current Location
         </Text>
         <TouchableOpacity onPress = {() => navigation.navigate('MapViewMainer')}>
         <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
            </TouchableOpacity>
      </View>
      <DashedLine dashLength={4} dashThickness={2} dashGap={5} style = {{marginTop:10,marginBottom:10}}/>
       <Text style = {{fontWeight:"bold",fontSize:15,marginTop:20}}> MAX DISTANCE  {distancePreference} mi. </Text> 
       <Slider
          style={{width: Dimensions.get('window').width - 60, height: 40}}
          minimumValue={1}
          maximumValue={500}
          minimumTrackTintColor="#a19b9a" 
          maximumTrackTintColor="#a19b9a" 
          onValueChange = {(value) => setDistancePreference(parseInt(value))}
          value = {user.distancePreference} 
          
          onSlidingComplete = {onSlidingComplete}
          
      
      
        />
        <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 10,
       }}/>
       {/* <View style = {{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
       <Text style = {{ fontWeight:"600"}}>SHOW ME</Text>
       {handleGenderPreference()}
       <TouchableOpacity onPress = {() => navigation.navigate('GenderPreference', {page:"AccountSettings"})}>
       <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Edit</Text>
       </TouchableOpacity>
       
       </View> */}
       {/* <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:10,
          marginTop: 10,
       }}/> */}
       <Text style = {{fontWeight:"600", marginBottom:10, marginTop:10}}>AGE RANGE</Text> 
       <View style = {{flexDirection:"row", alignItems:"center", zIndex:600}}>
          
      
       <Text style = {{fontWeight:"600", marginRight:20}}>MIN</Text>
       <DropDownPicker
          defaultValue = {minAgePreference}                
          items={[
              
              {label: '15', value: 15, },
              {label: '16', value: 16},
              {label: '17', value: 17},
              {label: '18', value: 18},
              {label: '19', value: 19},
              {label: '20', value: 20},
              {label: '21', value: 21},
              {label: '22', value: 22},
              {label: '23', value: 23},
              {label: '24', value:24},
              {label: '25', value:25},
              {label: '26', value:26},
              {label: '27', value:27},
              {label: '28', value:28},
              {label: '29', value:29},
              {label: '30', value:30},
              {label: '31', value:31},
              {label: '32', value:32},
              {label: '33', value:33},
              {label: '34', value:34},
              {label: '35', value:35},
              {label: '36', value:36},
              {label: '37', value:37},
              {label: '38', value:38},
              {label: '39', value:39},
              {label: '40', value:40},
              {label: '41', value:41},
              {label: '42', value:42},
              {label: '43', value:43},
              {label: '44', value:44},
              {label: '45', value:45},
              {label: '46', value:46},
              {label: '47', value:47},
              {label: '48', value:48},
              {label: '49', value:49},
              {label: '50', value:50},
              {label: '51', value:51},
              {label: '52', value:53},
              {label: '53', value:53},
              {label: '54', value:54},
              {label: '55', value:55},
              {label: '56', value:56},
              {label: '57', value:57},
              {label: '58', value:58},
              {label: '59', value:59},
              {label: '60', value:60},
      
              
      
            ]}
          onPress = {() => {console.log("pressed")}}
          containerStyle={{height: 40, width:100, }}
          style={{}}
          itemStyle={{
              
              backgroundColor:"white", 
              fontColor:"white",
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
          onChangeItem={item => selectMinAgePreference(item.value)}
          
      />
      
      <Text style = {{fontWeight:"600", marginRight:20, marginLeft:20}}>MAX</Text>
      <DropDownPicker
          defaultValue = {maxAgePreference}                
          items={[
              
              {label: '15', value: 15, },
              {label: '16', value: 16},
              {label: '17', value: 17},
              {label: '18', value: 18},
              {label: '19', value: 19},
              {label: '20', value: 20},
              {label: '21', value: 21},
              {label: '22', value: 22},
              {label: '23', value: 23},
              {label: '24', value:24},
              {label: '25', value:25},
              {label: '26', value:26},
              {label: '27', value:27},
              {label: '28', value:28},
              {label: '29', value:29},
              {label: '30', value:30},
              {label: '31', value:31},
              {label: '32', value:32},
              {label: '33', value:33},
              {label: '34', value:34},
              {label: '35', value:35},
              {label: '36', value:36},
              {label: '37', value:37},
              {label: '38', value:38},
              {label: '39', value:39},
              {label: '40', value:40},
              {label: '41', value:41},
              {label: '42', value:42},
              {label: '43', value:43},
              {label: '44', value:44},
              {label: '45', value:45},
              {label: '46', value:46},
              {label: '47', value:47},
              {label: '48', value:48},
              {label: '49', value:49},
              {label: '50', value:50},
              {label: '51', value:51},
              {label: '52', value:53},
              {label: '53', value:53},
              {label: '54', value:54},
              {label: '55', value:55},
              {label: '56', value:56},
              {label: '57', value:57},
              {label: '58', value:58},
              {label: '59', value:59},
              {label: '60', value:60},
      
              
      
            ]}
          onPress = {() => {console.log("pressed")}}
      
          containerStyle={{height: 40, width:100, }}
          style={{}}
          itemStyle={{
              
              backgroundColor:"white", 
              fontColor:"white",
              justifyContent: 'flex-start',
              fontWeight: '600',
          }}
          dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
          onChangeItem={item => selectMaxAgePreference(item.value)}
          
      />
      
       </View>
       <View style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 10,
          borderColor:'grey',
          marginBottom:15,
          marginTop: 15,
       }}/>
       <View style = {{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
       <Text style = {{fontWeight:'600'}}>Matchmaking Only, No Dating.</Text>
       
            <SwitchSelector
          options={options}
          initial={user.dating ? 1:0}
          onPress={value => {updateUser(userId, {dating:value})}}
          style = {{width:100}}
        />
        
      
       </View>
       <Text style = {{fontWeight:"600"}}>
       While turned on, your profile will not be matched with anyone. People you have already matched with may still see your profile, however. You can still see and chat with your matches. 
       </Text>
      
      </View>
      
      </View>
      <View style = {{flex:0.2}}>
      
      </View>
      
      </View>
      )

}
return(
<View><Text>Loading</Text></View>
)
}


const styles = StyleSheet.create({
     headerSection:{
        color:"grey", fontSize:20, fontWeight:"bold",  
     }, 
     dottedLine:{
        borderBottomWidth:1, 
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 1,
        borderColor:'grey',
        marginBottom:10,
        marginTop: 10,
          
     }, 
     
})