import  React, {useState,useRef,useEffect, useContext, useLayoutEffect} from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity,ScrollView,Image, Button,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, AsyncStorage} from 'react-native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { uploadImage } from '../../networking'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {firebase} from '../../config'; 
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
//@refresh reset
import SettingsHome from './SettingsHome';
import { pick } from 'underscore';
import AppContext from '../../AppContext'; 

import {updateUser} from '../../networking';
import {DragSortableView} from 'react-native-drag-sort'; 
import { FadeOutToBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';



export default function PhotosLatest({navigation, route }){
  const myContext = useContext(AppContext); 
    const data = [null,null,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYFV-bwRLTx5vbXeIRyRZDH86KNG-4ktGcg&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6A2uPoIft1gvtqS4DBeyqqAE7cR84ViUgCw&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEHrfimWzHnSVc2NXN5uFvpMqHGuheiskIA&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZ3FO0fz8uU6pZqVGlwJZlDdaRil7JsKdkw&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAlpQBahpDZSNYA6W-nCeQlpF_RcoYkAbdSg&usqp=CAU','data:image/jpeg;base64,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']
    const {user, userId,db, setUser} = myContext;     
    const insets = useSafeAreaInsets();
    const [camera,setCamera] = useState(); 
    const [profilePic, setProfilePic] = useState(); 
    
    
    //const {page} = route.params; 
    
    const localUri = (uri) => {
      
    }

  
    // useEffect(() => {
    // user.photos.map(val => {
    //     Image.prefetch(val); 
    // })    
    // }, [])
    
    
    async function updateProfilePicToServer(){
      
      const pattern = /file/i; 
      const result = profilePic.match(pattern); 
      
      
      const response = await fetch(profilePic); 
      const blob = await response.blob(); 
      const namer = Math.random().toString(36).substring(2);
      const ref = firebase.storage().ref().child("images/"+ namer); 
      await ref.putFile(blob, {cacheControl:'max-age=31536000', contentType:'image/jpeg'}).catch(error => console.log(error))
      const result1 = await ref.getDownloadURL().catch(error => console.log(error))
      
      db.collection('user').doc(userId).set({profilePic:result1}, {merge:true});  
      
      
      }
      useLayoutEffect(() => {
        navigation.setOptions({
          headerShown:false,
        });
      }, [navigation]);
    
    
    const [photos, setPhotos] = useState(user.photos)
    
    const loadProfilePic = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
        setProfilePic(pickerResult.uri)
        setUser({...user, profilePic:pickerResult.uri}) 
  }   

  const keys = ["apple", "banana", "mango", "cheery", "gobhi", "lemon", "chocolate", "vanilla", "juice", "bruce", "viagra", "vigoss"]
    const [namer, setNamer] = useState(); 
     async function getId(){
      const result = await AsyncStorage.getItem('_id')
      return result; 
   }
   let key;  
   
    
    useEffect(() => {
        const result = getId(); 
        key = result; 
        return () => {
           
        }
    }, [photos,namer])
    const setPhotosFunc = (uri) => {
         const arr = photos.concat(); 
         const imageLength = arr.filter(val => val != null); 
         arr[imageLength.length] = uri; 
         setPhotos([ ...arr, ]);
         
    }
    const YourImage = () => (
        <FastImage
            style={{ width: 200, height: 200 }}
            source={{
                uri: 'https://unsplash.it/400/400?image=1',
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
        />
    )
    const uploadPhotosToServer = async () => {
       
      const result = photos.map(async val => {
        if(val == null){
          return val; 
        }
        const pattern = /file/i; 
        const resulter = val.match(pattern); 
        if(resulter !== null ){
       const response = await fetch(val); 
        const blob = await response.blob(); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob)
        const result1 = await ref.getDownloadURL(); 
        return result1; 
        }
        return val;       
      })
      Promise.all(result).then(finaler => {
         
         updateUser(userId, {photos:finaler})
      }) 
    
    }     
    
     
    
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:false});
        
        setPhotosFunc(pickerResult.uri)
        // var storageRef = firebase.storage().ref();
        // var mountainsRef = storageRef.child('mountains.png');
        // const data = new FormData();
        // const result = pickerResult.uri.replace('file://', '');
        // //data.append('file',  {uri: result,filename :'imageName.png',type: 'image/png'});
        // mountainsRef.putString(pickerResult.base64).then(function(snapshot) {
        
        // }); 

         
        
        
      }
      const _deletePhoto = (uri:any) => {
        const arr = photos.concat(); 
        const index = arr.indexOf(uri); 
        arr.splice(index,1,)
        arr.push(null); 
        setPhotos(arr); 
}
 const updateToServer = async () => {
    
 }

 const profileTemplate = user.profilePic ? 
 <TouchableOpacity onPress = {() => loadProfilePic()} style = {{justifyContent:"center", alignItems:"center"}}>
   <View>
   <Image source = {{uri:user.profilePic}} style = {{height:160, width:160, borderRadius:80}}/>
   <AntDesign name="pluscircle" size={20} color="red" style = {{position:'absolute', top:120, right:8 }}/>
   </View>
 </TouchableOpacity>
 :<TouchableOpacity 
 onPress = {() => loadProfilePic()}
 style = {{flexDirection:"row", justifyContent:"center"}}
 >
 
 <Entypo name="camera" size={80} color="pink" />
 <View style = {{alignSelf:"flex-end", marginLeft:-10}}>
 <AntDesign name="pluscircle" size={30} color="red" />
 </View>
 </TouchableOpacity>     
 const template = photos.map((ages, index) => {
     
   if(ages){

     return <View key = {index.toString()} style = {{flexDirection:"row"}}>
       
       <Image source = {{uri:ages}} style = {{height:100, width:100,}} key = {index.toString()}/>
       <TouchableOpacity 
       style = {{position:'absolute', top:80, right:0 }}
       onPress = {() => _deletePhoto(ages)}
       >
       <Entypo name="circle-with-cross" size={24} color="red" />
       </TouchableOpacity>   
       </View>
   } 
   

return <View style = {{marginRight:10, justifyContent:'center', alignItems:'center'}} key = {keys[index]}>
<MaterialIcons name="insert-photo" size={100} color="black" />
</View>

})  



const marker = <TouchableOpacity  onPress = {() => openImagePickerAsync()} style = {{width:100, height:100, justifyContent:'center', alignItems:'center'}}> 
<AntDesign name="pluscircle" size={40} color="red" />

</TouchableOpacity>
const image = photos.filter(val => val != null); 
template[image.length] = marker; 



  
 
console.log(photos)



const row1 = <View style = {{ flexDirection:"row",  marginBottom:15, justifyContent:'space-between',marginRight:30}}>
    {[template[0], template[1], template[2]]}
    </View>
const row2 = <View style = {{flexDirection:"row",marginBottom:15, justifyContent:'space-between', marginRight:30}}>
{[template[3], template[4], template[5]]

}
</View>    

return(
<View style = {{flex:1,paddingLeft:30, paddingRight:30, paddingTop:insets.top,backgroundColor:'white'}}>
<View style = {{flex:0.2}}> 

<TouchableOpacity onPress = {() => {updateProfilePicToServer(),uploadPhotosToServer(),  navigation.goBack()}} style = {{alignItems:'flex-end', marginTop:10}}>
   <Text style = {{color:"orange", fontSize:15, fontWeight:"bold"}}>Done</Text>
   </TouchableOpacity>
   
</View>
<View style = {{flex:0.7}}>

{profileTemplate}
<Text style = {{alignSelf:"center", fontStyle:'italic', fontWeight:"bold", marginTop:30}}>Add Multiple Photos to increase your chances </Text>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
{/* <View style = {{  flexWrap:'wrap',  marginTop:30}}>


{
    [row1,
    row2]
    
}

</View> */}
<DragSortableView
    onDataChange = {(data) => setPhotos(data)}
    dataSource={photos}
    parentWidth={400}
    marginChildrenLeft = {10}
    marginChildrenTop = {10}
    childrenWidth= {75}
    childrenHeight={80}
    keyExtractor={(item,index)=> index.toString()}
    renderItem={(item,index)=>{
        return item ? <View key = {index.toString()} style = {{flexDirection:"row"}}>
       
        <Image source = {{uri:item,cache:'force-cache'}} style = {{height:75, width:75,}} key = {index.toString()} resizeMode = {'cover'}  />
         
        <TouchableOpacity 
        style = {{position:'absolute', top:60, right:0 }}
        onPress = {() => _deletePhoto(item)}
        >
        <Entypo name="circle-with-cross" size={24} color="red" />
        </TouchableOpacity>   
        </View>:
        <TouchableOpacity onPress = {openImagePickerAsync}>
        <Image 
        resizeMethod = {'auto'}
        resizeMode = {'contain'}
        source = {require('../../assets/addedPhoto.png')} style = {{height:75, width:75}}/>
        </TouchableOpacity>
        
    }}
/>
<View style = {{borderBottomWidth:2, marginTop:30}}>

</View>
</View>

<View style = {{flex:0.1}}>

</View>

</View>
)
}