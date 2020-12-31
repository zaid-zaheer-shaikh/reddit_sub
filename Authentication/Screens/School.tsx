import  React, {useState,useRef,useEffect} from 'react';
import { Dimensions,View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements'; 
import { useMutation,useQuery } from '@apollo/react-hooks';
import { Header } from '../../src/common/Common';
import {firebase} from '../../config'; 
export default function School({navigation,route}){
    const [Email, setEmail] = useState();
        
       
  const _sendToServer = () => {
    console.log("called")
    const currentUser = firebase.auth().currentUser; 
    const db = firebase.firestore();
    console.log(currentUser.uid)
    db.collection('user').doc(currentUser.uid).set({ school:Email}, {merge:true}).then(val => console.log)
  }
    return(
        <KeyboardAvoidingView style = {{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View style = {{flex:1, }}>   
      <View style = {{flex:0.2}}>
      <TouchableOpacity onPress = {() => { navigation.navigate('Job')}}>
      <Text style = {{marginTop:20, alignSelf:"flex-end", marginRight:30, color:"orange", fontWeight:"bold"}}>Skip</Text>   
      </TouchableOpacity>
      </View>
      <View style = {{flex:0.5, marginLeft:30}}>
      <Text style = {{fontWeight:"bold", fontSize:23, }}> What school did you attend?</Text>
      <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 60, marginTop:10}}/> 
      <TextInput 
      style = {{fontSize:35,borderBottomWidth:1, borderColor:"black",width:Dimensions.get('window').width -60,
        marginTop:40 }}
         placeholder = {"Ex: UC Berkeley"}  
         autoCorrect = {false}
         autoCapitalize = {"none"}
         value = {Email}
         onChangeText = {(text) => { setEmail(text)}}
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
  onPress = {() => { _sendToServer(), navigation.navigate('Job', {page:"something"})}}
/>
      </View>
      </View>
      </KeyboardAvoidingView>
      )
}