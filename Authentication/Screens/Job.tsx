import  React, {useState,useRef,useEffect} from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header } from '../../src/common/Common';
import { mutateSettings } from '../../networking'; 
import {GET_DETAILS} from '../../Account/Screens/DetailsSettings'; 
import {firebase} from '../../config'; 

export default function Job({navigation, route}){
    const [job, setJob] = useState();
    const {page} = route.params; 
    const _sendToServer = () => {
      console.log("called")
      const currentUser = firebase.auth().currentUser; 
      const db = firebase.firestore();
      console.log(currentUser.uid)
      db.collection('user').doc('trialUser').set({ job:job}, {merge:true}).then(val => console.log)
    }
    const _handlePage = () => {
       if(page == "DetailsSettings"){
          navigation.navigate("DetailsSettings")
          return; 
       }
       navigation.navigate('Hometown', {page:"something"})
    }
        
       
  
    return(
      <KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View style = {{flex:1, }}>   
      <View style = {{flex:0.2}}>
      <TouchableOpacity onPress = {() => _handlePage()}>
      <Text style = {{marginTop:20, alignSelf:"flex-end", marginRight:30, color:"orange", fontWeight:"bold"}}>Skip</Text>   
      </TouchableOpacity>
      </View>
      <View style = {{flex:0.5, marginLeft:30}}>
      <Text style = {{fontWeight:"bold", fontSize:23, }}> What's your job?</Text>
      <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:10}}/> 
      <TextInput 
      style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,
        marginTop:40 }}
         placeholder = {"Ex: Retail Manager"}  
         autoCorrect = {false}
         autoCapitalize = {"none"}
         value = {job}
         onChangeText = {(text) => { setJob(text)}}
        ></TextInput>
        <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:40, borderBottomColor:"grey"}}/> 
      </View>
      <View style = {{flex:0.3,justifyContent:"center", }}>
       {/* <Continue  onPress = {() => {_handleEmail(), mutateSettings({email:Email}) }}/>     */}
       <Button
  title="Continue"
  type="outline"
  containerStyle = {{backgroundColor:"black",marginLeft:30, marginRight:30}}
  titleStyle = {{color:"white", fontWeight:"700"}}
  disabledStyle = {{backgroundColor:"grey",}}
  disabled = {false}
  onPress = {() => { _sendToServer(),_handlePage() }}
/>
      </View>
      </View>
      </KeyboardAvoidingView>
      )
}