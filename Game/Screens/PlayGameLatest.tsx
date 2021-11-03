import  React, {useState,useRef,useEffect, useContext, useLayoutEffect, useCallback, forwardRef, createRef} from 'react';
import { Text, View, StyleSheet,Dimensions, Animated, Image, Keyboard } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AppContext from '../../AppContext'; 
import {createChatThread, updateUser} from '../../networking';
import { firebase } from '../../config'; 
import Draggable from 'react-native-draggable';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { assertValidExecutionArguments } from 'graphql/execution/execute';
import { logTen } from './logTen';
import { filter } from 'underscore';
import GamePreview from './GamePreview'; 
import {filterGamer, getDistanceFromLatLonInKm} from '../../networking'; 

import {LoadScreen} from '../../src/common/Common'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {Button} from 'react-native-elements'; 
import { LinearGradient } from 'expo-linear-gradient';


const db = firebase.firestore(); 
//@refresh reset
interface PlayGameLatestProps {}





const PlayGameLatest = ({navigation}) => {
  const [bar, setBar] = useState(0);
  const [client, setClient] = useState(); 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mainBackGround = useRef(new Animated.Value(1)).current;
  const backFade = useRef(new Animated.Value(0)).current;
  const fadeOpac = useRef(new Animated.Value(0)).current;
  const [questionsIndex, setQuestionsIndex] = useState(0); 
  const insets = useSafeAreaInsets();
  const {width, height} = Dimensions.get('window');   
  const [mainWidth, setMainWidth] = useState()
  const [mainHeight, setMainHeight] = useState()
  const [mainX, setMainX] = useState()
  const [mainY, setMainY] = useState()
  const mailer = useRef(); 
  const [containerHeight, setContainerHeight] = useState(0); 
  const [index, setIndex] = useState(0); 
  const [profiles,setProfiles] = useState([])
  const myContext = useContext(AppContext); 
  const {user, userId, computeName, demo, questions20, suggestedClient,setSuggestedClient} = myContext;
  const [pageFocused, setPageFocused] = useState(false); 
  const [preview, setPreview] = useState()
  const colors = ['green', 'blue', 'red']
  const [loading, setLoading] = useState(true); 
  const [_update,setUpdate] = useState(0); 
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [timerCoundown, setTimerCountdown] = useState(1); 
  
  
  // const [questions, setQuestions] = useState([]); 
  const element = createRef();
  const [matchFound, setMatchFound] = useState(false); 
  const [matchFoundObj, setMatchFoundObj] = useState({}); 


  // useEffect(() => {
  //   setQuestions(questions20)
  //   console.log("lengther.."); 
  //   console.log(questions20.length)
  // }, [questions20])

  const handleBack = () => {
    navigation.reset({index:2, routes:[{name:"Homer"}]}) 
  }

  useEffect(() => {
  async function namer(){
    const result = await AsyncStorage.getItem('preview'); 
    setPreview(result)

  }  
  namer()
  
  }, [])
  useEffect(() => {
    Keyboard.dismiss()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      
      // forceUpdate()
      setMainX(90)
    });
    navigation.setOptions({
      
      headerShown:false, 
      headerTitle:false, 
      // headerLeft:() => { 
      //    return  <TouchableOpacity onPress = {() => {resetGame(),navigation.goBack()}} style = {{marginLeft:15}}>
      //        <Text style = {{fontWeight:'bold', fontSize:17, color:'blue'}}>Back</Text>  
      //        </TouchableOpacity>
      // }, 
      headerRight:() => <View style = {{flexDirection:'row'}}>
        <TouchableOpacity style = {{marginRight:20}} onPress = {() => flip()}>
        {/* <FontAwesome name="refresh" size={24} color="black" /> */}
        <Text>Flip</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{marginRight:20}} onPress = {onRefresh}>
        <FontAwesome name="refresh" size={24} color="black" />
      </TouchableOpacity>
      </View>     
    })
},[]) 
  
   
const resetGame = () => {
  setBar(0); 
  setQuestionsIndex(0); 
}
    
    
   

  //  useEffect(() => {
    
  //   db.collection('questions').get().then(onResult => {
  //        const result = onResult.docs.map(val => val.data()); 
  //        setQuestions(result); 
  //   })
  // }, [])


  useEffect(() => {
    const db = firebase.firestore(); 
    db.collection('namer123').doc("0").get().then(async onResult => {
       const result = await onResult.data(); 
       
    }) 
  }, [])
  
//   useEffect(() => {
//     console.log("checking useEffcts called"+user.userSet)
//     db.collection('dimensionQuestions10').doc("0").get().then(async onResult => {
//       if(onResult.exists){
        
//         const data = parseInt(user.userSet); 
//         const increment = data + 1; 
//         const finalIncremnent = increment.toString(); 
//         db.collection('user').doc(userId).set({userSet:finalIncremnent},{merge:true})
//         const result = await onResult.data(); 
//         console.log("shaktiman"); 
        
//         console.log(result.questions.length)
//         setQuestions(result.questions); 
//         return; 
//       }

//       console.log("second namer called")
//       const int = parseInt(user.userSet);
//       const finalInt = int - 1; 
//       const finalString = finalInt.toString();   
//       db.collection('dimensionQuestions10').doc(finalString).get().then(onResult1 => {
//         const result1 = onResult1.data();
        
//         setQuestions(result1.questions); 
//         db.collection('user').doc(userId).set({userSet:"0"},{merge:true}) 
//       })
      
//  })
//   // db.collection('questions').get().then(onResult => {
//   //        const result = onResult.docs.map(val => val.data()); 
//   //        //setQuestions(result); 
//   //        console.log(result)
//   //        db.collection('dimensionQuestions').doc('0').set({questions:result})
//   //   }) 
//   }, [_update])
  useEffect(() => {
    
    setQuestionsIndex(0)
  }, [])

 useEffect(() => {
  if(questionsIndex == 19){
    db.collection('user').doc(userId).update({
      points:firebase.firestore.FieldValue.arrayUnion({
        pointFor:'roundCompleted', 
        point:20, 
        createdAt:new Date()
      })
    })
    resetGame(); 
    navigation.navigate('Play20', {matchFound, matchFoundObj})
  }  

 }, [questionsIndex])  
//  useEffect(() => {
//   if(questionsIndex == 9){
//     db.collection('user').doc(userId).update({
//       points:firebase.firestore.FieldValue.arrayUnion({
//         pointFor:'roundCompleted', 
//         point:10, 
//         createdAt:new Date()
//       })
//     })
//     // resetGame(); 
//     navigation.navigate('HalfRound', {matchFound:matchFound})
//   }  

//  }, [questionsIndex])  

  

console.log("matchfound monkey"+matchFound)

useEffect(() => {
const namer =  [
     {
      "dimension": "wealthy",
      "question": "Would ask for a loan in bad times?",
    },
     {
      "dimension": "empathetic",
      "question": "Will listen to your breakup stories?",
    },
     
  ]
  
}, [])

  
  const backFader = () => {
    Animated.timing(backFade, {
      toValue:2, 
      useNativeDriver:false, 
      duration:1
    }).start()
  }
  
  const mainFader = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(mainBackGround, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(mainBackGround, {
        useNativeDriver:false,
        toValue: 1,
        duration: 3000
      }),
      
    ]).start()
  }; 

  const fadeOp = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(fadeOpac, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(fadeOpac, {
        useNativeDriver:false,
        toValue: 1,
        duration: 300
      }),
      Animated.timing(fadeOpac, {
        useNativeDriver:false,
        toValue: 0,
        duration: 300
      })
    ]).start()
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver:false,
        duration: 1
      }),
      Animated.timing(fadeAnim, {
        useNativeDriver:false,
        toValue: 1,
        duration: 100
      }),
      Animated.timing(fadeAnim, {
        useNativeDriver:false,
        toValue: 0,
        duration: 100
      })
    ]).start()
  };

  
   
  
  const [namer, setNamer] = useState(); 
  const mainView = useRef(); 
  
  //const [demo, setDemo] = useState([])  
  const measure = () => {
      
 }
  const filteredMatched = (arr) => {
    var filtered = arr.filter(
        function(e) {
          return this.indexOf(e.phoneNumber) < 0;
        },
        user.suggestedMatches
    );
    return filtered;  
  }
  // useEffect(() => {
  //   async function namer(){
  //     if(user.datingPoolList.length >= 2){
  
  //       // const checkerResult = await Promise.all(user.datingPoolList.map(async val => {
  //       //  return await db.collection('user').doc(val).get().then(onDoc => {
  //       //    if(onDoc.exists){
  //       //      return onDoc.data()
  //       //    }
  //       //    return null; 
  //       //  })
         
  //       // }))
  //       // const finalChecker = checkerResult.filter(val => val !== null);  
  //       // setLoading(true)
  //       const checkerResult = await db.collection('user').get().then(onResult => {
  //         const users =  onResult.docs.map(val => val.data());
  //         console.log("user length is"+users.length) 
  //         const result = users.filter(person => user.datingPoolList.includes(person.phoneNumber))
  //         return result; 
  //      }) 
  //        const finalChecker = checkerResult.filter(val => val !== null);
        
  //       setDemo(finalChecker); 
        
  //       // setLoading(false); 
  //        }
  //   }
  //   namer()
          
  // }, [])
  
  useLayoutEffect(() => {
    
    if(mailer.current ){
        mailer.current.measure((x,y, height, width, px, py) => {
        setContainerHeight(height);
        })
    }
    if(mainView.current){
            mainView.current.measure((x,y, height, width, px, py) => {
            
            setMainX(90); 
            setMainWidth(width); 
            setMainY(py); 
            setMainHeight(height);
            })
    }
  }, [mainHeight, mainX, mainY, mainWidth,_update ])


  function computeSections(){
    if(mailer.current ){
      mailer.current.measure((x,y, height, width, px, py) => {
      setContainerHeight(height);
      })
  }
  if(mainView.current ){
          mainView.current.measure((x,y, height, width, px, py) => {
          
          setMainX(px); 
          setMainWidth(width); 
          setMainY(py); 
          setMainHeight(height);
          })
  }

  }

  const addPoints = () => {
      if(client == 'first'){
           
           db.collection('user').doc(demo[index].phoneNumber).update({[questions20[questionsIndex].dimension]:firebase.firestore.FieldValue.increment(1),
            votes:firebase.firestore.FieldValue.arrayUnion({
              answeredBy:userId, 
              createdAt:new Date(), 
              dimension:questions20[questionsIndex].dimension, 
              question:questions20[questionsIndex].question
            })
           })
           return; 
      }
      if(client == 'second'){
        
        db.collection('user').doc(demo[index + 1].phoneNumber).update({[questions20[questionsIndex].dimension]:firebase.firestore.FieldValue.increment(1),
          votes:firebase.firestore.FieldValue.arrayUnion({
            answeredBy:userId, 
            createdAt:new Date(), 
            dimension:questions20[questionsIndex].dimension, 
            question:questions20[questionsIndex].question
          })
         })
        return; 
   }
  }

 
  async function introChecker(client1, client2){
    
    const id = createChatThread(client1, client2); 
    
    const result = await db.collection('introductions').doc(id).get(); 
    if(result.exists){
      return false; 
    }
    return true; 

  }
//   useEffect(() => {
//     console.log("checking useEffcts called"+user.userSet)
//     db.collection('dimensionQuestions').doc("0").get().then(onResult => {
//       if(onResult.exists){
        
//         const data = parseInt(user.userSet); 
//         const increment = data + 1; 
//         const finalIncremnent = increment.toString(); 
//         db.collection('user').doc(userId).set({userSet:finalIncremnent},{merge:true})
//         const result = onResult.data(); 
//         setQuestions(result.questions); 
//         return; 
//       }
//       const int = parseInt(user.userSet);
//       const finalInt = int - 1; 
//       const finalString = finalInt.toString();   
//       db.collection('dimensionQuestions').doc(finalString).get().then(onResult1 => {
//         const result1 = onResult1.data();
        
//         setQuestions(result1.questions); 
//         db.collection('user').doc(userId).set({userSet:"0"},{merge:true}) 
//       })
      
//  })
//   // db.collection('questions').get().then(onResult => {
//   //        const result = onResult.docs.map(val => val.data()); 
//   //        //setQuestions(result); 
//   //        console.log(result)
//   //        db.collection('dimensionQuestions').doc('0').set({questions:result})
//   //   }) 
//   }, [])

 const popClient = () => {
    if(suggestedClient.length == 0){
     setSuggestedClient(demo);   
     return; 
    }
    const copy = JSON.parse(JSON.stringify(suggestedClient)) 
    copy.shift(); 
    setSuggestedClient(copy); 
 }  

 console.log("sugar")
 console.log(questionsIndex)

 const getGenderClass = (genderClass) => {
  if(genderClass == 'MM'){
     return ['MM']
  }
  if(genderClass == 'MF'){
    return ['FM']
 }
 if(genderClass == 'ME'){
  return ['FE', 'TE', 'TM', 'FM']
 }
 if(genderClass == 'FE'){
  return ['ME', 'TE', 'TF', 'MF']
 }
 if(genderClass == 'FF'){
  return ['FF']
}
if(genderClass == 'FM'){
return ['MF']
}
if(genderClass == 'TM'){
return ['ME']
}
if(genderClass == 'TF'){
return ['FE']
}
if(genderClass == 'TE'){
return ['TE', 'FE', 'ME']
}
}
const getGenderClassAge = (age,genderClass) => {
  if(genderClass == 'MM'){
     return [age, age + 1]
  }
  if(genderClass == 'MF'){
     return [age, age - 1] 
 }
 if(genderClass == 'ME'){
   return [age, age + 1, age - 1]
 }
 if(genderClass == 'FE'){
   return [age, age + 1, age - 1]
 }
 if(genderClass == 'FF'){
  return [age, age + 1]
}
if(genderClass == 'FM'){
return [age, age + 1]
}
if(genderClass == 'TM'){
return [age, age + 1, age - 1]
}
if(genderClass == 'TF'){
 return [age, age + 1, age - 1]
}
if(genderClass == 'TE'){
return [age, age + 1, age - 1]
}
}
 
  
  const suggestMatches = () => {


    const client = suggestedClient[0];
          db.collection('user').where('state', '==', client.state).get().then(async onResult => {
          const users = onResult.docs.map(val =>val.data());
          console.log('clientName')
          console.log(suggestedClient[0].name)
          
          console.log(users.length) 
          const usersLogged = logTen(users); 
          const clientLogged = logTen(client)
          const filterBySelf = filterGamer(usersLogged, 'phoneNumber', [client.phoneNumber], null, null);
          const clientGender = client.genderClass; 
          const genderChecker = getGenderClass(clientGender) 

          const filterByGender  = filterBySelf.excludedObjects.filter(val => genderChecker?.includes(val.genderClass)) 
          const genderAgeFilter = getGenderClassAge(client.ageSet, client.genderClass); 
          const filterByAge = filterByGender.filter(val => genderAgeFilter.includes(val.ageSet)); 
          //const filterByGenderPrefence = filterByGender.filter(val => val.genderPreference == client.gender)

          let counter = 0; 
          console.log("jantar")
          
          filterByAge.some(async val => {
               const gender = val.gender; 
               
              if(val.appUser && val.subLocality == client.subLocality){

                  
                   const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                   return db.collection('introductions').doc(_id).get().then(onDoc => {
                    
                     if(onDoc.exists == false){
                      setMatchFound(true);
                      setMatchFoundObj({client:clientLogged, user:val});
                      popClient()

                      return true;      
                     }
                   })
                 }
                 if(val.subLocality == client.subLocality){
                  const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                   return db.collection('introductions').doc(_id).get().then(onDoc => {
                    
                     if(onDoc.exists == false){
                      setMatchFound(true);
                      setMatchFoundObj({client:clientLogged, user:val});
                      popClient()

                      return true;      
                     }
                   })
                  
                 }
                 if(val.appUser){
                  const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                   return db.collection('introductions').doc(_id).get().then(onDoc => {
                    
                     if(onDoc.exists == false){
                      setMatchFound(true);
                      setMatchFoundObj({client:clientLogged, user:val});
                      popClient()

                      return true;      
                     }
                   })
                 }
                 const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                   return db.collection('introductions').doc(_id).get().then(onDoc => {
                    
                     if(onDoc.exists == false){
                      setMatchFound(true);
                      setMatchFoundObj({client:clientLogged, user:val});
                      popClient()

                      return true;      
                     }
                   })
                   

                 
                //  if(!val.appUser && val.gender == genderChecker && val.subLocality == client.subLocality){
                  
                //   const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                //   return db.collection('introductions').doc(_id).get().then(onDoc => {
                   
                //     if(onDoc.exists == false){
                //      setMatchFound(true);
                //      setMatchFoundObj({client:clientLogged, user:val});   
                //      return true;      
                //     }
                //   })
                // }
                // if(val.appUser && val.gender == genderChecker && val.subLocality !== client.subLocality) {
                  
                //   const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
                //   return db.collection('introductions').doc(_id).get().then(onDoc => {
                   
                //     if(onDoc.exists == false){
                //      setMatchFound(true);
                //      setMatchFoundObj({client:clientLogged, user:val});   
                //      return true;      
                //     }
                //   })
                // }
              
          })
           
        })


    
  //   if(client == 'first'){
        
        
  //       const client = demo[index]; 
  //       db.collection('user').where('state', '==', demo[index].state).get().then(async onResult => {
  //         const users = onResult.docs.map(val =>val.data()); 
  //         const usersLogged = logTen(users); 
  //         const clientLogged = logTen(client)

  //         // const datingFilter = filterGamer(usersLogged, 'phoneNumber', user.datingPoolList, null, null); 

          
  //         // let matchObject; 
          
  //         // const filterBySuggestions = filterGamer(datingFilter.excludedObjects, 'phoneNumber', user.suggestedMatches, null, null);
  //         const filterBySelf = filterGamer(usersLogged, 'phoneNumber', [client.phoneNumber], null, null);
  //         let counter = 0; 
  //         filterBySelf.excludedObjects.some(async val => {
               

               
  //              const gender = val.gender; 
  //             //  const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude);
  //              const genderChecker = client.gender == 'male' ? 'female':'male';  
  //             //  if( distance < client.distancePreference && val.gender == genderChecker && (client.minAgePreference <= val.age && client.maxAgePreference >= val.age ) && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
  //             //   || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
  //             //  ) {
  //             //  if( val.gender == genderChecker && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
  //             //    || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
  //             //   ) {
                
  //             //    const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
  //             //    return db.collection('introductions').doc(_id).get().then(onDoc => {
                  
  //             //      if(onDoc.exists == false){
  //             //       setMatchFound(true);
  //             //       setMatchFoundObj({client:clientLogged, user:val});   
  //             //       //db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
  //             //       // navigation.navigate('Endorsement', {client:clientLogged,user:val })

  //             //       return true;      
  //             //      }
  //             //    })
  //             //  }
  //             if( val.appUser && val.gender == genderChecker && val.subLocality == client.subLocality) {
                  
  //                  const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
  //                  return db.collection('introductions').doc(_id).get().then(onDoc => {
                    
  //                    if(onDoc.exists == false){
  //                     setMatchFound(true);
  //                     setMatchFoundObj({client:clientLogged, user:val});   
  //                     //db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
  //                     // navigation.navigate('Endorsement', {client:clientLogged,user:val })
  
  //                     return true;      
  //                    }
  //                  })
  //                }
  //                if(!val.appUser && val.gender == genderChecker && val.subLocality == client.subLocality){
                  
  //                 const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
  //                 return db.collection('introductions').doc(_id).get().then(onDoc => {
                   
  //                   if(onDoc.exists == false){
  //                    setMatchFound(true);
  //                    setMatchFoundObj({client:clientLogged, user:val});   
  //                    //db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
  //                    // navigation.navigate('Endorsement', {client:clientLogged,user:val })
 
  //                    return true;      
  //                   }
  //                 })
  //               }
  //               if(val.appUser && val.gender == genderChecker && val.subLocality !== client.subLocality) {
                  
  //                 const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
  //                 return db.collection('introductions').doc(_id).get().then(onDoc => {
                   
  //                   if(onDoc.exists == false){
  //                    setMatchFound(true);
  //                    setMatchFoundObj({client:clientLogged, user:val});   
  //                    //db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
  //                    // navigation.navigate('Endorsement', {client:clientLogged,user:val })
 
  //                    return true;      
  //                   }
  //                 })
  //               }
              
  //         })

  //       // for(let x = 0;  x < filterBySelf.excludedObjects.length; x++ ){
  //       //   const gender = filterBySelf.excludedObjects[x].gender; 
  //       //        const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude);
  //       //        const genderChecker = client.gender == 'male' ? 'female':'male';  
  //       //       //  if( distance < client.distancePreference && val.gender == genderChecker && (client.minAgePreference <= val.age && client.maxAgePreference >= val.age ) && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
  //       //       //   || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
  //       //       //  ) {
                
  //       //        if( filterBySelf.excludedObjects[x].gender == genderChecker && (filterBySelf.excludedObjects[x].charisma == client.charisma || filterBySelf.excludedObjects[x].creativity == client.creativity || filterBySelf.excludedObjects[x].empathetic == client.empathetic 
  //       //          || filterBySelf.excludedObjects[x].honest == client.honest || filterBySelf.excludedObjects[x].humor == client.humor || filterBySelf.excludedObjects[x].looks == client.looks || filterBySelf.excludedObjects[x].status == client.status || filterBySelf.excludedObjects[x].wealthy == client.wealthy)
  //       //         ) {
                
  //       //          const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
  //       //          db.collection('introductions').doc(_id).get().then(onDoc => {
                  
  //       //            if(onDoc.exists == false){
  //       //             setMatchFound(true);  
  //       //             db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
                    
  //       //             navigation.navigate('Endorsement', {client:clientLogged,user:val })
                    
                    
  //       //            }
  //       //          })
  //       //        }

  //       // }
          
           
  //       })
        
  //  }
//    if(client == 'second'){
//     const client = demo[index + 1]; 
//     console.log('clienter')
//     console.log(client.phoneNumber); 
//     db.collection('user').where('state', '==', demo[index + 1].state).get().then(async onResult => {
//       const users = onResult.docs.map(val =>val.data()); 
//       const usersLogged = logTen(users); 
//       const clientLogged = logTen(client)
//       const datingFilter = filterGamer(usersLogged, 'phoneNumber', user.datingPoolList, null, null); 
      
//       let matchObject; 
      
//       const filterBySuggestions = filterGamer(datingFilter.excludedObjects, 'phoneNumber', user.suggestedMatches, null, null);
//       const filterBySelf = filterGamer(filterBySuggestions.excludedObjects, 'phoneNumber', [client.phoneNumber], null, null);
      
//       filterBySelf.excludedObjects.some(async val => {
//            const gender = val.gender; 
//            const distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, client.latitude, client.longitude);
//            const genderChecker = client.gender == 'male' ? 'female':'male';  
//           //  if( distance < client.distancePreference && val.gender == genderChecker && (client.minAgePreference <= val.age && client.maxAgePreference >= val.age ) && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
//           //    || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
//           //   ) {
//             if( val.gender == genderChecker && (val.charisma == client.charisma || val.creativity == client.creativity || val.empathetic == client.empathetic 
//               || val.honest == client.honest || val.humor == client.humor || val.looks == client.looks || val.status || val.wealthy == client.wealthy)
//              ) {
              
//              const _id = createChatThread(client.phoneNumber, val.phoneNumber); 
//              return db.collection('introductions').doc(_id).get().then(onDoc => {
              
//                if(onDoc.exists == false){
//                 db.collection('user').doc(userId).set({suggestedMatches:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}, {merge:true})
//                 navigation.navigate('Endorsement', {client:clientLogged,user:val })   
//                 return true; 
//                }
//              })
//            }
//       })
      
       
//     })  
    
     
     
      
// } 
}
const onRefresh = () => {
db.collection('user').doc(userId).set({suggestedMatches:[]}, {merge:true}) 
}

const handleGame = () => {
  updateUser(userId, {gamePreview:true});
  navigation.navigate('PlayGameLatest')
   
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
 
 


  const valer = fadeAnim.interpolate({
    inputRange:[0,1],
    outputRange:['white','green'], 
 })
 const blader = backFade.interpolate({
  inputRange:[0,1,2,3],
  outputRange:['red','green', 'blue', 'yellow'], 
})
const mainer = mainBackGround.interpolate({
  inputRange:[0,1],
  outputRange:[1,0], 
})

  function measureMain(gesture){
    
    if(gesture.nativeEvent.pageY > mainY && gesture.nativeEvent.pageY < mainY + mainHeight && gesture.nativeEvent.pageX > mainX && gesture.nativeEvent.pageX < mainX + mainWidth){
      return true;   
    }      
    return false; 
  }

  

  const firstTemplate = () => {
       if(demo.length){
         return <Animated.View style = {{opacity:mainBackGround}}>
         
           {demo[index].profilePicSmall ? <Image source = {{uri:demo[index].profilePicSmall}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="account-circle" size={80} color="black" />} 
         
         <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:11, marginTop:5, marginLeft:-10}}>{computeName(demo[index])}</Text>
         
         </Animated.View>
       }
  }
  const secondTemplate = () => {
       if(demo.length){
        
        const newArr = JSON.parse(JSON.stringify(demo)); 
        newArr.splice(index,1); 
        const random = getRandomInt(newArr.length); 
        
        
        return <Animated.View style = {{opacity:mainBackGround}}>
         
        {newArr[random].profilePicSmall ? <Image source = {{uri:newArr[random].profilePicSmall}} style = {{height:80, width:80, borderRadius:40}}/>:<MaterialIcons name="person" size={80} color="black" />} 
      
      <Text style = {{alignSelf:'center', fontWeight:'bold', fontSize:11, marginTop:5, }}>{computeName(newArr[random])}</Text>
      
      </Animated.View>
       }
  }
  const incrementIndex = () => {
    
    if(index + 1 < demo.length -1 ) {
        setIndex(index + 1)
   }
    if(index + 1 == demo.length -1){
      setIndex(0)
    }
  }
  const questionsIndexIncrement = () => {
      if(questionsIndex < questions20.length - 1){
           setQuestionsIndex(questionsIndex + 1); 
      } 
  }

  useLayoutEffect(() => {
    
  }, [])

  // useEffect(() => {
  //     if(bar < 0.9){
  //       setTimeout(flip, 3000)
  //     }
      
    
    
  //   return () => clearTimeout()
  // }, [bar])

  
  console.log(matchFoundObj)

  const flip = () => {
       incrementIndex();   
       questionsIndexIncrement(); 
       
       setBar(bar + 0.05)
  }
  

  const onDragRelease = (gesture) => {
    
    const measured = measureMain(gesture); 
    if(measured){
       fadeOp()
       addPoints()
          if(questionsIndex > 1){
            suggestMatches();   
          }
          
       
       
       fadeIn()
       backFader()
       mainFader()
       incrementIndex();   
       questionsIndexIncrement(); 
       
       setBar(bar + 0.05)
       
    }
    
  }
  
  
   

  // if(loading){
  //   return <LoadScreen/>
  // }
  
   if(user.datingPoolList.length < 2){
     return <View style = {{flex:1, backgroundColor:'black', justifyContent:'center', alignItems:'center',  }}>
       <TouchableOpacity>
         <Text style = {{color:'red', fontWeight:'bold'}}> Back</Text>
       </TouchableOpacity>
       <Text style = {{color:'white', fontSize:40, fontWeight:'bold'}}>Not enough contacts</Text>
       <Text style = {{color:'white', fontStyle:'italic'}}>Please add some contacts in your dating pool list to play the game</Text>
     </View>
    
   }
   
   
    return (
        <Animated.View style={{flex:1, paddingBottom:user.dating == false ? 0 :insets.bottom, paddingTop:user.dating == false ? 0 :insets.top,}}>
          
          
          <LinearGradient colors={[`rgba(${0},${0},0.4,0.4)`, 'transparent']} style = {{flex:1}} start = {{x:0.1, y:0.3}}>
          
          
  
                <View style = {{flex:0.3,}}>
                <View style = {{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                 <TouchableOpacity onPress = {() => {navigation.goBack()}} style = {{marginLeft:15}}>
             {user.dating == false ? null : <Text style = {{fontWeight:'bold', fontSize:17, color:'white'}}>Back</Text>} 
             </TouchableOpacity>
             <View style = {{flexDirection:'row'}}>
        <TouchableOpacity style = {{marginRight:20}} onPress = {() => flip()}>
        {/* <FontAwesome name="refresh" size={24} color="black" /> */}
        {/* <Text style = {{color:'white', fontWeight:'bold'}}>{timerCoundown}</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style = {{marginRight:20}} onPress = {onRefresh}>
        <FontAwesome name="refresh" size={24} color="white" />
      </TouchableOpacity>
      </View>
                </View>  
                <View style = {{marginTop:10, marginLeft:30, marginRight:30}}>
                <Text style = {{alignSelf:'flex-end', marginBottom:10}}> {questionsIndex + 1}/{questions20.length }</Text>    
                
                <Progress.Bar progress={bar} width={Dimensions.get('window').width -60   } height = {20} />
                <Text style = {{marginTop:30,  marginBottom:10,fontSize:20, fontWeight:'bold',color:'white'}} numberOfLines = {3} textBreakStrategy = {'highQuality'}> {questions20.length ? questions20[questionsIndex].question:null} </Text>
                </View>    
                
                </View>
                <View style = {{flex:0.3, }}>
                <Animated.View ref = {mainView}  style = {{position:'absolute', left:width - 300, backgroundColor:valer, height:200, width:200, borderRadius:100, justifyContent: 'center',alignItems:'center'}}>
                <MaterialIcons name="person" size={180} color="black" />
                </Animated.View>    
                <Animated.View style = {{opacity:fadeOpac, position:'absolute', top:5, right:50}}>
                <View style = {{flexDirection:"row", alignItems:'center'}}>
               <Text style = {{fontWeight:"bold",color:'black'}}>+1</Text> 
               <MaterialCommunityIcons name="lightbulb-on" size={24} color="black" />
               </View>
               <Text style = {{fontWeight:"bold",color:'black'}}>{ questions20.length && questionsIndex > 0 ? questions20[questionsIndex - 1].dimension:null }</Text>   
                </Animated.View>
                </View>
                
                <View style = {{flex:0.4, }} ref = {mailer}>
               <Draggable x={30} y={containerHeight - 250} isCircle  onDragRelease = {(gesture) => onDragRelease( gesture)} shouldReverse = {true} onPressIn = {() => setClient('first')}>
                   {firstTemplate()}
               </Draggable>    
               
               <Draggable x={width - 130} y={containerHeight - 250}  isCircle  onDragRelease = {( gesture) => {onDragRelease( gesture)}} onPressIn = {() => setClient('second')} shouldReverse>
                   {secondTemplate()}
               </Draggable>    
               </View> 
              </LinearGradient >
              
              
        </Animated.View>
      )
  
  
  
}

export default PlayGameLatest;

const styles = StyleSheet.create({
  container: {flex:1}
});
