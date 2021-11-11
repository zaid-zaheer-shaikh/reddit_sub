import  React, {useState,useRef,useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, SectionList, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Foundation, Feather, Entypo,MaterialCommunityIcons, FontAwesome5  } from '@expo/vector-icons';
import {firebase } from '../../config'; 
import {Button} from 'react-native-elements'; 
import {iconFactory} from '../../src/common/Common'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

;
import AppContext from '../../AppContext'; 
interface MatchViewLatestProps {}

const MatchViewLatest = ({navigation, route}) => {
    const {width, height} = Dimensions.get('window'); 
    const [hidden, setHidden]= useState(false);
    const insets = useSafeAreaInsets();
    const myContext = useContext(AppContext); 
    const {user, userId, db, createChatThread, firebase, computeName, setGeneratedMatch, generatedMatch, selfFilter} = myContext;
    const expoToken = 'ExponentPushToken[W-LwjHLivbcjOyOCbGIUve]'; 
    
    
    const tester = route.params.pageData; 
    const clientIndex = route.params.clientIndex; 
    const userIndex = route.params.userIndex;
    console.log("userIndex"+userIndex) 
    const [sliderState, setSliderState] = useState({ currentPage: clientIndex });
    const [sliderState1, setSliderState1] = useState({ currentPage: userIndex });

    


    const setEvent = () => {
      const client = tester[sliderState.currentPage].client; 
      const user = tester[sliderState.currentPage].data[sliderState1.currentPage];
      // setGeneratedMatch((generatedMatch) => [...generatedMatch, {client:tester[sliderState.currentPage].client, user:tester[sliderState.currentPage].data[sliderState1.currentPage]}])
      const _id = createChatThread(client.phoneNumber, user.phoneNumber);
      console.log("id is"+_id)   
      db.collection('introductions').doc(_id).set({client1:client.phoneNumber, client2:user.phoneNumber, createdAt:new Date(), discoveredBy:userId}, {merge:true});
      db.collection('user').doc(userId).set({points:firebase.firestore.FieldValue.arrayUnion({
        pointFor:'matchDiscovered', 
        point:50, 
        createdAt: new Date(), 
        client:client.phoneNumber
      })}, {merge:true}).then(() => {
          sendPushNotification(expoToken)
          navigation.goBack()
      }) 

    }

    async function sendPushNotification(expoPushToken) {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: 'Introduction Received',
          body: 'Introduction received',
          data: { someData: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }



     
     
    useEffect(() => {
       navigation.setOptions({
           headerTitle:false, 
           headerLeft:() => (<TouchableOpacity onPress = {() => navigation.goBack()} style = {{marginLeft:10}}><Text style = {{fontWeight:'bold', color:'blue', fontSize:20}}>Back</Text></TouchableOpacity>),
           headerRight:() => <TouchableOpacity onPress = {() => navigation.navigate('SelfSort')} style = {{marginRight:15}}>
        <FontAwesome5 name="sort-numeric-down" size={24} color="black" />
        </TouchableOpacity>
       }) 
    }, [])

    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage && indexOfNextScreen >= 0) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
            setSliderState1({
                
                currentPage: 0,
            });
        }
    };

    

    const setSliderPage1 = (event: any) => {
        const { currentPage } = sliderState1;
        const { x } = event.nativeEvent.contentOffset;
        
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage && indexOfNextScreen >= 0) {
            setSliderState1({
                ...sliderState1,
                currentPage: indexOfNextScreen,
            });
        }
    };
    const [pageData, setPageData] = useState([
        {
         client:{
            name:"zaid shaikh", 
            firstName:"zaid"                              
         }, 
          
         data:[
             {
              name:"katherine kuckoo", 
              firstName:"Katherine"
            }, 
            {
                name:"Samantha Hikkens", 
                firstName:"Samnatha"
            }, 
        ]
    }, 
    {
        client:{
           name:"kemal pasha", 
           firstName:"zaid"                              
        }, 
         
        data:[
            {
            name:"Samantha Hikkens", 
            firstName:"Samnatha"
            }, 
            {
                name:"Sujata williams", 
                firstName:"sujatha"
            },
    
    ]
   },
])



    const textTemplate = hidden ? null: <View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {/* {iconFactory('humor', 20)}
          <Text style = {styles.scores }>Humor:  {tester[sliderState.currentPage].data[sliderState1.currentPage].humor} </Text> */}
          {iconFactory(selfFilter.sortOrder[3], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[3].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[3]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {/* {iconFactory('empathetic', 20)}
          <Text style = {styles.scores }>Empathetic:  {tester[sliderState.currentPage].data[sliderState1.currentPage].empathetic} </Text> */}
          {iconFactory(selfFilter.sortOrder[4], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[4].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[4]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5, marginLeft:5}}>
          {/* {iconFactory('wealthy', 20)}
          <Text style = {styles.scores }>Wealthy:  {tester[sliderState.currentPage].data[sliderState1.currentPage].wealthy} </Text> */}
          {iconFactory(selfFilter.sortOrder[5], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[5].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[5]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {/* {iconFactory('looks', 20)}
          <Text style = {styles.scores }>Looks:  {tester[sliderState.currentPage].data[sliderState1.currentPage].looks}</Text> */}
          {iconFactory(selfFilter.sortOrder[6], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[6].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[6]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {/* {iconFactory('status', 20)}
          <Text style = {styles.scores }>Status:  {tester[sliderState.currentPage].data[sliderState1.currentPage].status} </Text> */}
          {iconFactory(selfFilter.sortOrder[7], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[7].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[7]]}</Text>
          </View>
          </View> 
    const sliderTemplate =  tester.map((val,index) => {
        return <View style={{ width, }} id = {val.client.phoneNumber}>
        <View style = {{ alignItems:"center", marginTop:20}}>
        <Text style = {{fontWeight:"bold", marginTop:10, marginBottom:10}}>{ computeName(val.client) }</Text>
        {val.client.profilePicSmall ?<Image source = {{uri:val.client.profilePicSmall}} style = {{height:160, width:160, borderRadius:80}}/> :<MaterialIcons name="account-circle" size={150} color="orange" />}
        
        </View>
        </View>
       })
       const sliderTemplate1 =  tester[sliderState.currentPage].data.map((val,index) => {
        return <View style={{ width, height:100 }} id = {val.id}>
        <View style = {{ alignItems:"center", }}>
        {val.profilePicSmall ?<Image source = {{uri:val.profilePicSmall}} style = {{height:60, width:60, borderRadius:30}}/> :<MaterialCommunityIcons name="account-circle" size={70} color="blue" />}
        <Text style = {{fontWeight:"bold", marginTop:10}}>{ computeName(val) }</Text>
        </View>
        </View>
       })

     return (
         <View style = {{flex:1, paddingBottom:insets.bottom}}>
             <View style = {{flex:0.5}}>
            <View style = {{flex:1}}>
             <ScrollView
contentOffset = {{x:414*clientIndex, y:0}}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
style = {{zIndex:1,}} 
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={100}
onScroll={(event: any) => {
  setSliderPage(event);
}}
>
{sliderTemplate}
</ScrollView>

<ScrollView
contentOffset = {{x:414*userIndex, y:0}}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
style = {{position:'absolute', top:150, left:50, zIndex:2000}} 
horizontal = {true}
pagingEnabled = {true}
scrollEventThrottle={400}
onScroll={(event: any) => {
  setSliderPage1(event);
}}
>
{sliderTemplate1}
</ScrollView>    

</View>    
             </View>
             <ScrollView style = {{flex:0.4,}}>
            <View style = {{flexDirection:"row", marginTop:20,}}>
         <TouchableOpacity onPress = {() => setHidden(!hidden)} style = {{marginLeft:30, marginBottom:10, flexDirection:"row", alignItems:"center", }}>
         {hidden ? <Feather name="arrow-down-circle" size={40} color="pink" />:<Feather name="arrow-up-circle" size={40} color="pink" />}
         <View style = {{borderBottomWidth:1, width:Dimensions.get('window').width - 100}}>

         </View>
         </TouchableOpacity>
          
           

        </View>
            <View style = {{flexDirection:"row", justifyContent:'space-around'}}>
            <View>
            <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
            
          {/* <Text style = {styles.scores }>{selfFilter.sortOrder[0].toUpperCase()}:  {selfMatchView.data[sliderState.currentPage][selfFilter.sortOrder[0]]}</Text> */}
          {iconFactory(selfFilter.sortOrder[0], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[0].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[0]]}</Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"center",padding:5}}>
          {/* {iconFactory('creativity', 20)}
          <Text style = {styles.scores }>Creativity:  {tester[sliderState.currentPage].data[sliderState1.currentPage].creativity}</Text> */}
          {iconFactory(selfFilter.sortOrder[1], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[1].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[1]]}</Text>
          </View> 
          <View style = {{flexDirection:"row", alignItems:"center", padding:5}}>
          {/* {iconFactory('honest', 20)}
          <Text style = {styles.scores }> Honest:  {tester[sliderState.currentPage].data[sliderState1.currentPage].honest}</Text> */}
          {iconFactory(selfFilter.sortOrder[2], 20)}
          <Text style = {styles.scores }>{selfFilter.sortOrder[2].toUpperCase()}: {tester[sliderState.currentPage].data[sliderState1.currentPage][selfFilter.sortOrder[2]]}</Text>
          </View> 
          {textTemplate}
            </View>

            <View style = {{alignItems:"center", justifyContent:"center", padding:5, marginTop:5}}>
                <Text style = {{fontSize:30, fontWeight:"900"}}>{}</Text>
                <Text style = {{fontSize:14, fontWeight:'bold',marginTop:5}}>Compatability Score</Text>
                <Text style = {{fontSize:14, fontWeight:'bold',marginTop:5}}>{tester[sliderState.currentPage].data[sliderState1.currentPage].dimension} </Text>
            </View> 

            </View>
            <View style={{
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 1,
    borderColor:'grey',
     marginBottom:30, 
     marginLeft:30, 
     marginRight:30, 
     marginTop:15
  }}></View>
           <View style = {{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
           <Feather name="alert-triangle" size={24} color="red" />
           <Text style = {{marginLeft:5, fontWeight:'bold'}}>Narcissism: {tester[sliderState.currentPage].data[sliderState1.currentPage].narcissism}</Text>
           </View>
           <View style = {{borderBottomWidth:2, marginLeft:30, marginRight:30, borderBottomColor:"grey", marginTop:10}}>
           </View>
           
           </ScrollView>
           <View style = {{marginTop:10, marginLeft:30, marginRight:30, flex:0.1, marginBottom:15, justifyContent:"center", }}>
           <Button title = "Generate Match" buttonStyle = {{backgroundColor:"#afd968"}} titleStyle = {{color:"black", fontWeight:'bold'}} onPress = {() => {setEvent() }}/>
           </View>
         </View>
     )
        
};

export default MatchViewLatest;

const styles = StyleSheet.create({
    container: {flex:1},
    scores:{
      fontSize:15, 
      fontWeight:'bold', 
      marginLeft:5
    },
  });

