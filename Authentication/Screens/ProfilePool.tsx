import  React, {useState,useRef,useEffect, useContext} from 'react';
import { View, StyleSheet,  TextInput,TouchableOpacity,ScrollView,Image,FlatList,Picker,PanResponder,Animated, TouchableWithoutFeedback, SafeAreaView, Dimensions, Keyboard} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation,useQuery } from '@apollo/react-hooks';
import {Button, SearchBar,Text,Avatar} from 'react-native-elements'; 
import { createFilter } from 'react-native-search-filter';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFocusEffect } from '@react-navigation/native';


import { FontAwesome, } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import DropDownPicker from 'react-native-dropdown-picker';
import {HeaderBar,ImageView,ModalViewMap, SingleImageView} from '../../src/common/Common';
import AppContext from '../../AppContext'; 
import {filterGamer, updateUser} from '../../networking';
const contactList = [{name:"zaid shaikh", firstname:"zaid", _id:'123'},{name:"david", firstname:"zaid", _id:'1234'}];
const friendsList = [{}];
import * as Contacts from 'expo-contacts';
import {firebase} from '../../config'; 
const db = firebase.firestore(); 
// @refresh reset
const country = [{"name":"Afghanistan","dial_code":"+93","code":"AF"},{"name":"Albania","dial_code":"+355","code":"AL"},{"name":"Algeria","dial_code":"+213","code":"DZ"},{"name":"AmericanSamoa","dial_code":"+1 684","code":"AS"},{"name":"Andorra","dial_code":"+376","code":"AD"},{"name":"Angola","dial_code":"+244","code":"AO"},{"name":"Anguilla","dial_code":"+1 264","code":"AI"},{"name":"Antigua and Barbuda","dial_code":"+1268","code":"AG"},{"name":"Argentina","dial_code":"+54","code":"AR"},{"name":"Armenia","dial_code":"+374","code":"AM"},{"name":"Aruba","dial_code":"+297","code":"AW"},{"name":"Australia","dial_code":"+61","code":"AU"},{"name":"Austria","dial_code":"+43","code":"AT"},{"name":"Azerbaijan","dial_code":"+994","code":"AZ"},{"name":"Bahamas","dial_code":"+1 242","code":"BS"},{"name":"Bahrain","dial_code":"+973","code":"BH"},{"name":"Bangladesh","dial_code":"+880","code":"BD"},{"name":"Barbados","dial_code":"+1 246","code":"BB"},{"name":"Belarus","dial_code":"+375","code":"BY"},{"name":"Belgium","dial_code":"+32","code":"BE"},{"name":"Belize","dial_code":"+501","code":"BZ"},{"name":"Benin","dial_code":"+229","code":"BJ"},{"name":"Bermuda","dial_code":"+1 441","code":"BM"},{"name":"Bhutan","dial_code":"+975","code":"BT"},{"name":"Bosnia and Herzegovina","dial_code":"+387","code":"BA"},{"name":"Botswana","dial_code":"+267","code":"BW"},{"name":"Brazil","dial_code":"+55","code":"BR"},{"name":"British Indian Ocean Territory","dial_code":"+246","code":"IO"},{"name":"Bulgaria","dial_code":"+359","code":"BG"},{"name":"Burkina Faso","dial_code":"+226","code":"BF"},{"name":"Burundi","dial_code":"+257","code":"BI"},{"name":"Cambodia","dial_code":"+855","code":"KH"},{"name":"Cameroon","dial_code":"+237","code":"CM"},{"name":"Canada","dial_code":"+1","code":"CA"},{"name":"Cape Verde","dial_code":"+238","code":"CV"},{"name":"Cayman Islands","dial_code":"+ 345","code":"KY"},{"name":"Central African Republic","dial_code":"+236","code":"CF"},{"name":"Chad","dial_code":"+235","code":"TD"},{"name":"Chile","dial_code":"+56","code":"CL"},{"name":"China","dial_code":"+86","code":"CN"},{"name":"Christmas Island","dial_code":"+61","code":"CX"},{"name":"Colombia","dial_code":"+57","code":"CO"},{"name":"Comoros","dial_code":"+269","code":"KM"},{"name":"Congo","dial_code":"+242","code":"CG"},{"name":"Cook Islands","dial_code":"+682","code":"CK"},{"name":"Costa Rica","dial_code":"+506","code":"CR"},{"name":"Croatia","dial_code":"+385","code":"HR"},{"name":"Cuba","dial_code":"+53","code":"CU"},{"name":"Cyprus","dial_code":"+537","code":"CY"},{"name":"Czech Republic","dial_code":"+420","code":"CZ"},{"name":"Denmark","dial_code":"+45","code":"DK"},{"name":"Djibouti","dial_code":"+253","code":"DJ"},{"name":"Dominica","dial_code":"+1 767","code":"DM"},{"name":"Dominican Republic","dial_code":"+1 849","code":"DO"},{"name":"Ecuador","dial_code":"+593","code":"EC"},{"name":"Egypt","dial_code":"+20","code":"EG"},{"name":"El Salvador","dial_code":"+503","code":"SV"},{"name":"Equatorial Guinea","dial_code":"+240","code":"GQ"},{"name":"Eritrea","dial_code":"+291","code":"ER"},{"name":"Estonia","dial_code":"+372","code":"EE"},{"name":"Ethiopia","dial_code":"+251","code":"ET"},{"name":"Faroe Islands","dial_code":"+298","code":"FO"},{"name":"Fiji","dial_code":"+679","code":"FJ"},{"name":"Finland","dial_code":"+358","code":"FI"},{"name":"France","dial_code":"+33","code":"FR"},{"name":"French Guiana","dial_code":"+594","code":"GF"},{"name":"French Polynesia","dial_code":"+689","code":"PF"},{"name":"Gabon","dial_code":"+241","code":"GA"},{"name":"Gambia","dial_code":"+220","code":"GM"},{"name":"Georgia","dial_code":"+995","code":"GE"},{"name":"Germany","dial_code":"+49","code":"DE"},{"name":"Ghana","dial_code":"+233","code":"GH"},{"name":"Gibraltar","dial_code":"+350","code":"GI"},{"name":"Greece","dial_code":"+30","code":"GR"},{"name":"Greenland","dial_code":"+299","code":"GL"},{"name":"Grenada","dial_code":"+1 473","code":"GD"},{"name":"Guadeloupe","dial_code":"+590","code":"GP"},{"name":"Guam","dial_code":"+1 671","code":"GU"},{"name":"Guatemala","dial_code":"+502","code":"GT"},{"name":"Guinea","dial_code":"+224","code":"GN"},{"name":"Guinea-Bissau","dial_code":"+245","code":"GW"},{"name":"Guyana","dial_code":"+595","code":"GY"},{"name":"Haiti","dial_code":"+509","code":"HT"},{"name":"Honduras","dial_code":"+504","code":"HN"},{"name":"Hungary","dial_code":"+36","code":"HU"},{"name":"Iceland","dial_code":"+354","code":"IS"},{"name":"India","dial_code":"+91","code":"IN"},{"name":"Indonesia","dial_code":"+62","code":"ID"},{"name":"Iraq","dial_code":"+964","code":"IQ"},{"name":"Ireland","dial_code":"+353","code":"IE"},{"name":"Israel","dial_code":"+972","code":"IL"},{"name":"Italy","dial_code":"+39","code":"IT"},{"name":"Jamaica","dial_code":"+1 876","code":"JM"},{"name":"Japan","dial_code":"+81","code":"JP"},{"name":"Jordan","dial_code":"+962","code":"JO"},{"name":"Kazakhstan","dial_code":"+7 7","code":"KZ"},{"name":"Kenya","dial_code":"+254","code":"KE"},{"name":"Kiribati","dial_code":"+686","code":"KI"},{"name":"Kuwait","dial_code":"+965","code":"KW"},{"name":"Kyrgyzstan","dial_code":"+996","code":"KG"},{"name":"Latvia","dial_code":"+371","code":"LV"},{"name":"Lebanon","dial_code":"+961","code":"LB"},{"name":"Lesotho","dial_code":"+266","code":"LS"},{"name":"Liberia","dial_code":"+231","code":"LR"},{"name":"Liechtenstein","dial_code":"+423","code":"LI"},{"name":"Lithuania","dial_code":"+370","code":"LT"},{"name":"Luxembourg","dial_code":"+352","code":"LU"},{"name":"Madagascar","dial_code":"+261","code":"MG"},{"name":"Malawi","dial_code":"+265","code":"MW"},{"name":"Malaysia","dial_code":"+60","code":"MY"},{"name":"Maldives","dial_code":"+960","code":"MV"},{"name":"Mali","dial_code":"+223","code":"ML"},{"name":"Malta","dial_code":"+356","code":"MT"},{"name":"Marshall Islands","dial_code":"+692","code":"MH"},{"name":"Martinique","dial_code":"+596","code":"MQ"},{"name":"Mauritania","dial_code":"+222","code":"MR"},{"name":"Mauritius","dial_code":"+230","code":"MU"},{"name":"Mayotte","dial_code":"+262","code":"YT"},{"name":"Mexico","dial_code":"+52","code":"MX"},{"name":"Monaco","dial_code":"+377","code":"MC"},{"name":"Mongolia","dial_code":"+976","code":"MN"},{"name":"Montenegro","dial_code":"+382","code":"ME"},{"name":"Montserrat","dial_code":"+1664","code":"MS"},{"name":"Morocco","dial_code":"+212","code":"MA"},{"name":"Myanmar","dial_code":"+95","code":"MM"},{"name":"Namibia","dial_code":"+264","code":"NA"},{"name":"Nauru","dial_code":"+674","code":"NR"},{"name":"Nepal","dial_code":"+977","code":"NP"},{"name":"Netherlands","dial_code":"+31","code":"NL"},{"name":"Netherlands Antilles","dial_code":"+599","code":"AN"},{"name":"New Caledonia","dial_code":"+687","code":"NC"},{"name":"New Zealand","dial_code":"+64","code":"NZ"},{"name":"Nicaragua","dial_code":"+505","code":"NI"},{"name":"Niger","dial_code":"+227","code":"NE"},{"name":"Nigeria","dial_code":"+234","code":"NG"},{"name":"Niue","dial_code":"+683","code":"NU"},{"name":"Norfolk Island","dial_code":"+672","code":"NF"},{"name":"Northern Mariana Islands","dial_code":"+1 670","code":"MP"},{"name":"Norway","dial_code":"+47","code":"NO"},{"name":"Oman","dial_code":"+968","code":"OM"},{"name":"Pakistan","dial_code":"+92","code":"PK"},{"name":"Palau","dial_code":"+680","code":"PW"},{"name":"Panama","dial_code":"+507","code":"PA"},{"name":"Papua New Guinea","dial_code":"+675","code":"PG"},{"name":"Paraguay","dial_code":"+595","code":"PY"},{"name":"Peru","dial_code":"+51","code":"PE"},{"name":"Philippines","dial_code":"+63","code":"PH"},{"name":"Poland","dial_code":"+48","code":"PL"},{"name":"Portugal","dial_code":"+351","code":"PT"},{"name":"Puerto Rico","dial_code":"+1 939","code":"PR"},{"name":"Qatar","dial_code":"+974","code":"QA"},{"name":"Romania","dial_code":"+40","code":"RO"},{"name":"Rwanda","dial_code":"+250","code":"RW"},{"name":"Samoa","dial_code":"+685","code":"WS"},{"name":"San Marino","dial_code":"+378","code":"SM"},{"name":"Saudi Arabia","dial_code":"+966","code":"SA"},{"name":"Senegal","dial_code":"+221","code":"SN"},{"name":"Serbia","dial_code":"+381","code":"RS"},{"name":"Seychelles","dial_code":"+248","code":"SC"},{"name":"Sierra Leone","dial_code":"+232","code":"SL"},{"name":"Singapore","dial_code":"+65","code":"SG"},{"name":"Slovakia","dial_code":"+421","code":"SK"},{"name":"Slovenia","dial_code":"+386","code":"SI"},{"name":"Solomon Islands","dial_code":"+677","code":"SB"},{"name":"South Africa","dial_code":"+27","code":"ZA"},{"name":"Spain","dial_code":"+34","code":"ES"},{"name":"Sri Lanka","dial_code":"+94","code":"LK"},{"name":"Sudan","dial_code":"+249","code":"SD"},{"name":"Suriname","dial_code":"+597","code":"SR"},{"name":"Swaziland","dial_code":"+268","code":"SZ"},{"name":"Sweden","dial_code":"+46","code":"SE"},{"name":"Switzerland","dial_code":"+41","code":"CH"},{"name":"Tajikistan","dial_code":"+992","code":"TJ"},{"name":"Thailand","dial_code":"+66","code":"TH"},{"name":"Togo","dial_code":"+228","code":"TG"},{"name":"Tokelau","dial_code":"+690","code":"TK"},{"name":"Tonga","dial_code":"+676","code":"TO"},{"name":"Trinidad and Tobago","dial_code":"+1 868","code":"TT"},{"name":"Tunisia","dial_code":"+216","code":"TN"},{"name":"Turkey","dial_code":"+90","code":"TR"},{"name":"Turkmenistan","dial_code":"+993","code":"TM"},{"name":"Turks and Caicos Islands","dial_code":"+1 649","code":"TC"},{"name":"Tuvalu","dial_code":"+688","code":"TV"},{"name":"Uganda","dial_code":"+256","code":"UG"},{"name":"Ukraine","dial_code":"+380","code":"UA"},{"name":"United Arab Emirates","dial_code":"+971","code":"AE"},{"name":"United Kingdom","dial_code":"+44","code":"GB"},{"name":"United States","dial_code":"+1","code":"US"},{"name":"Uruguay","dial_code":"+598","code":"UY"},{"name":"Uzbekistan","dial_code":"+998","code":"UZ"},{"name":"Vanuatu","dial_code":"+678","code":"VU"},{"name":"Wallis and Futuna","dial_code":"+681","code":"WF"},{"name":"Yemen","dial_code":"+967","code":"YE"},{"name":"Zambia","dial_code":"+260","code":"ZM"},{"name":"Zimbabwe","dial_code":"+263","code":"ZW"},{"name":"land Islands","dial_code":"","code":"AX"},{"name":"Antarctica","dial_code":null,"code":"AQ"},{"name":"Bolivia","dial_code":"+591","code":"BO"},{"name":"Brunei Darussalam","dial_code":"+673","code":"BN"},{"name":"Cocos (Keeling) Islands","dial_code":"+61","code":"CC"},{"name":"Cote d'Ivoire","dial_code":"+225","code":"CI"},{"name":"Falkland Islands (Malvinas)","dial_code":"+500","code":"FK"},{"name":"Guernsey","dial_code":"+44","code":"GG"},{"name":"Holy See (Vatican City State)","dial_code":"+379","code":"VA"},{"name":"Hong Kong","dial_code":"+852","code":"HK"},{"name":"Iran, Islamic Republic of","dial_code":"+98","code":"IR"},{"name":"Isle of Man","dial_code":"+44","code":"IM"},{"name":"Jersey","dial_code":"+44","code":"JE"},{"name":"Korea","dial_code":"+850","code":"KP"},{"name":"Lao People's Democratic Republic","dial_code":"+856","code":"LA"},{"name":"Libyan Arab Jamahiriya","dial_code":"+218","code":"LY"},{"name":"Macao","dial_code":"+853","code":"MO"},{"name":"Macedonia","dial_code":"+389","code":"MK"},{"name":"Micronesia","dial_code":"+691","code":"FM"},{"name":"Moldova, Republic of","dial_code":"+373","code":"MD"},{"name":"Mozambique","dial_code":"+258","code":"MZ"},{"name":"Palestinian Territory, Occupied","dial_code":"+970","code":"PS"},{"name":"Pitcairn","dial_code":"+872","code":"PN"},{"name":"Réunion","dial_code":"+262","code":"RE"},{"name":"Russia","dial_code":"+7","code":"RU"},{"name":"Saint Barthélemy","dial_code":"+590","code":"BL"},{"name":"Saint Helena","dial_code":"+290","code":"SH"},{"name":"Saint Kitts and Nevis","dial_code":"+1 869","code":"KN"},{"name":"Saint Lucia","dial_code":"+1 758","code":"LC"},{"name":"Saint Martin","dial_code":"+590","code":"MF"},{"name":"Saint Pierre and Miquelon","dial_code":"+508","code":"PM"},{"name":"Saint Vincent and the Grenadines","dial_code":"+1 784","code":"VC"},{"name":"Sao Tome and Principe","dial_code":"+239","code":"ST"},{"name":"Somalia","dial_code":"+252","code":"SO"},{"name":"Svalbard and Jan Mayen","dial_code":"+47","code":"SJ"},{"name":"Syrian Arab Republic","dial_code":"+963","code":"SY"},{"name":"Taiwan, Province of China","dial_code":"+886","code":"TW"},{"name":"Tanzania, United Republic of","dial_code":"+255","code":"TZ"},{"name":"Timor-Leste","dial_code":"+670","code":"TL"},{"name":"Venezuela, Bolivarian Republic of","dial_code":"+58","code":"VE"},{"name":"Viet Nam","dial_code":"+84","code":"VN"},{"name":"Virgin Islands, British","dial_code":"+1 284","code":"VG"},{"name":"Virgin Islands, U.S.","dial_code":"+1 340","code":"VI"}]
const computeName = (obj) => {
     if(obj.name){
        return obj.name
     }
     if(obj.firstName && obj.lastName){
        return obj.firstName+obj.lastName
     }
     return obj.firstName
  }

const useFetchContactPool = (navigation) => {
     const myContext = useContext(AppContext); 
     const {user, userId, contactList, setContactList, setSingleContact, defaultDataObject, datingFlatList,inviteToPlay, setInvitetoplay} = myContext;
     const KEYS_TO_FILTERS = ['name'];
     
     
     const [search, setSearch] = useState('');
     const [currentUser, setCurrentUser] = useState(''); 
     const [visible, setVisible] = useState(false); 
     const [namer, setNamer] = useState(1);
     const [data,setData] = useState({
          getContactPoolList:{
               data:[]
          }
     })
     
        

        
     
     
     
     useEffect(() => {
       async function namer(){
       if(user.contactList.length > 0){
          
     //   const onResult = db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.contactList).get().then(onResult => {
     //      const data = onResult.docs.map(val => val.data());
          function applyToIncluded(val){
               return {...val, invitationSent:true}
         }
     // const checkerResult = await Promise.all(user.contactList.map(async val => {
     //      return await db.collection('user').doc(val).get().then(onDoc => {
     //        if(onDoc.exists){
     //          return onDoc.data()
     //        }
     //        return null; 
     //      })
          
     //     }))
     //     const finalChecker = checkerResult.filter(val => val !== null);  

     const checkerResult = await db.collection('user').get().then(onResult => {
          const users =  onResult.docs.map(val => val.data());
          console.log("user length is"+users.length) 
          const result = users.filter(person => user.contactList.includes(person.phoneNumber))
          return result; 
       }) 
           const finalChecker = checkerResult.filter(val => val !== null); 
         //const result = filterGamer(data, 'phoneNumber', user.invitations, null,applyToIncluded)
 
 
             
     //     setContactList([...result.excludedObjects, ...result.includedObjects]);
     setContactList(finalChecker)
             
          
     //   }).catch(error => console.log(error.message))
       }
       if(user.contactList.length == 0){
          
          setContactList([])
       }     
       
        
}
 namer()
},[user.contactList])

      


     const _sendToServer = (val) => {
          
          if(!val.appUser && !val.latitude){
          setSingleContact(val); 
          navigation.navigate('SingleContactPhoto'); 
          return; 
          }
          db.collection('user').doc(userId).update({contactList:firebase.firestore.FieldValue.arrayRemove(val.phoneNumber)});
          db.collection('user').doc(userId).update({datingPoolList:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}); 

          
             
           
     }
     const transformPhoneNumber = (phoneNumber, countryCode) => {
          console.log("countryCode"+countryCode)
          const countryCoder = countryCode.toUpperCase();
          if(phoneNumber.includes("+")){
            return phoneNumber; 
          } 
          const obj = country.filter(val => val.code == countryCoder); 
          return obj[0].dial_code+phoneNumber; 
      }
          const filteredEmails = contactList.filter(createFilter(search, KEYS_TO_FILTERS))
          const _checkCaret = (val) => {
               const result = caret.filter(val1 => (
  
                    val.phoneNumber == val1.phoneNumber
               ))
               return result[0].caret; 
          }
          const setCaretTrue = (obj) => {
               const data = contactList.concat(); 
               const index = data.findIndex(val => val.phoneNumber == obj.phoneNumber)
               data[index].caret = true; 
               setContactList(data); 
               
          }
          const _uploadContacts = async () => {
               const { status } = await Contacts.requestPermissionsAsync(); 
               if (status === 'granted') {
                   const { data } = await Contacts.getContactsAsync({
                     fields: [Contacts.Fields.PhoneNumbers],
                   });
                   console.log(data)
                   if (data.length > 0) {
                     const contact = data;
                     const refined = contact.filter(val => val.phoneNumbers !== undefined);
                     const gamer = refined.map(val => {
                          return {
                              name:val.name ? val.name:null, 
                              firstName:val.firstName ?val.firstName:null, 
                              lastName:val.lastName ? val.lastName:null,
                              
                              // phoneNumber:transformPhoneNumber(val.phoneNumbers[0].digits, val.phoneNumbers[0].countryCode)
                              phoneNumber:val.phoneNumbers.length && val.phoneNumbers[0].countryCode ? transformPhoneNumber(val.phoneNumbers[0].digits, val.phoneNumbers[0].countryCode):val.phoneNumbers[0].digits
                          }
                     })
                     const finaler = gamer.filter(val => val.phoneNumber !== userId);
                   
                    const contactList = finaler.map(val => val.phoneNumber); 
                    // const checkerResult = await Promise.all(contactList.map(async val => {
                    //      return await db.collection('user').doc(val).get().then(onDoc => {
                    //        if(onDoc.exists){
                    //          return onDoc.data()
                    //        }
                    //        return null; 
                    //      })
                         
                    //     }))
                    const checkerResult = await db.collection('user').get().then(onResult => {
                         const users =  onResult.docs.map(val => val.data());
                         console.log("user length is"+users.length) 
                         const result = users.filter(person => contactList.includes(person.phoneNumber))
                         return result; 
                      })
                    const finalChecker = checkerResult.filter(val => val !== null);  
                    // const onResult = await db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', contactList).get().catch(error => console.log(error.message))
                    // const registeredUsers = onResult.docs.map(val =>  val.data());
                    // const registeredUsersNumbers = registeredUsers.map(val => val.phoneNumber); 
                    //setRegisteredUsers(registeredUsers) 
                    const registeredUsersNumbers = finalChecker.length ? finalChecker.map(val => val.phoneNumber):[];
                    var filtered = contactList.filter(
                       function(e) {
                         return this.indexOf(e) < 0;
                       },
                       registeredUsersNumbers
                   );
                   var filteredMainer = contactList.filter(
                    function(e) {
                      return this.indexOf(e) < 0;
                    },
                    [...user.datingPoolList, user.contactList]
                );
                   
                   const newUsers = []; 
                   for(let x = 0; x < finaler.length; x++){
                        for(let y = 0; y < filtered.length; y++ ){
                           if(finaler[x].phoneNumber == filtered[y]){ 
                               newUsers.push(finaler[x])
                           }              
                        }
                   }
                   
                   
       
                    
       
       
       
       
                   
                   
                    
                    db.collection('user').doc(userId).update({contactList:filteredMainer}); 
                    var batch = db.batch();
                    newUsers.map(val => {
                         const ref = db.collection('user').doc(val.phoneNumber)
                         batch.set(ref, {...val, matchMaker:userId}, {merge:true})
                    })
                    batch.commit().then(() => {
                       
                   });
       
                    
                      
                     
                     
                     
                     const networkData = {data:finaler}; 
                     
                     
                     
                      
       
                     
                   }
                 }
           }

           
          const renderItem = ({ item }) => {
               

           
               return (
                    <View key = {item.phoneNumber} style = {{ marginLeft:30, marginRight:30}}>
                    <View style = {{borderBottomWidth:1, borderBottomColor:"black", width:Dimensions.get('window').width - 60,marginBottom:10}}/>
                    <View style = {{flexDirection:"row", justifyContent:'space-between', marginBottom:5, marginTop:5}}>
                    <View style = {{flexDirection:"row", alignItems:"center"}}>
                                                      
                   {item.profilePicSmall ? <SingleImageView image = {item.profilePicSmall} style = {{marginRight:10}} />:<MaterialIcons name="account-circle" size={30} color="black" />}
                    <Text style = {{marginLeft:10, marginBottom:5, fontWeight:"bold", maxWidth:100}} >{computeName(item)}</Text>
                    </View>
                    {   
                         item.caret ? 
                    <TouchableOpacity onPress = {() => setCaretFalse(item)}><AntDesign name="up" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => setCaretTrue(item)}><AntDesign name="down" size={24} color="black" /></TouchableOpacity>}
                    </View>
                    { item.caret ? 
                    <View>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10,marginBottom:15}}>
                     <Text style = {{fontWeight:'bold'}}> ADD TO DATING POOL </Text>
                     <TouchableOpacity onPress = {() => {_sendToServer(item)}}>
                     <Entypo name="plus" size={24} color="black" />
                     </TouchableOpacity>
            
                    </View>
                    {item.appUser ? null:<View style={{
                        borderStyle: 'dotted',
                        borderWidth: 2,
                        borderRadius: 1,
                        borderColor:'grey',
                         marginBottom:10,
                         marginTop: 10,
                      }}/>}
                      {/* {item.appUser ? null : <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20}}>
                      {item.invitationSent ? <Text style = {{fontWeight:'bold',}}>INVITATION SENT</Text>:<Text style = {{fontWeight:'bold',}}>INVITE TO PLAY</Text>}
                      {item.invitationSent ? <View><AntDesign name="checkcircle" size={24} color="black" /></View>:<TouchableOpacity onPress = {() => navigation.navigate('Invitetoplay',{client:item, page:'friends'})}>
                      <Entypo name="mail" size={24} color="black" />
                      </TouchableOpacity>}
                      </View>} */}
                      </View>
                      :null}    
                    </View> 
               );
             };
          const setCaretFalse = (obj) => {
               const data = contactList.concat(); 
               const index = data.findIndex(val => val.phoneNumber == obj.phoneNumber)
               data[index].caret = false; 
               setContactList(data);
          }
           //console.log(data)
           return (
               <View style = {{flex:1}}>
           <View style = {{flex:0.3}}>
           
          <View style = {{flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:30,marginBottom:15}}>         
         <Text  style = {{ fontWeight:'bold',  fontSize:17 }}>
             Click to View a Contact
         </Text>
         <TouchableOpacity style = {{alignItems:"center", marginLeft:20,}} onPress = {() => navigation.navigate('NewContact')}>
         <AntDesign name="pluscircle" size={25} color="black" />
         </TouchableOpacity>
         </View>
         <SearchBar
         lightTheme
         round
         containerStyle = {{marginLeft:15, marginRight:15}}
         searchIcon={{ size: 24 }}
         onChangeText={text => setSearch(text)}
         placeholder="search"
         value={search}
       />
       <View style = {{flexDirection:'row', alignItems:'center', marginTop:30,}}> 
       <TouchableOpacity style = {{marginRight:10, marginLeft:30}} onPress = {() => _uploadContacts()}>
       <FontAwesome name="refresh" size={24} color="black" />
       </TouchableOpacity>
       <Text h5 style = {{fontWeight:"bold",}}> Select the contacts you want to help</Text>
       </View>
       </View>
            <View style = {{flex:0.7}}>   
            <FlatList
        data={filteredEmails}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.phoneNumber+index.toString()}
        extraData={namer}
        contentInset = {{bottom:200}}
      />  

       </View>
        
       </View>
       
     )
           
}

const useFetchDatingPool = (navigation) => {
     //const {data,loading,error} = useQuery(GET_DATING_POOL); 
     //const [removeDating] = useMutation(REMOVE_FROM_DATING); 
     const myContext = useContext(AppContext); 
     const {user, userId, contactList, setContactList,computePoints,datingFlatList,setDatingFlatlist,inviteToPlay} = myContext;
     
     const [currentUser, setCurrentUser] = useState(''); 
     const [visible, setVisible] = useState(false); 
     const [datingPoolList, setDatingPoolList] = useState([])
     const [country,selectCountry] = useState(['25 to 30']); 
     const KEYS_TO_FILTERS = ['name'];
     const [search, setSearch] = useState('');
     const [caret, setCaret] = useState([{caret:false, _id:123}]); 
     const _sendToServer = (val) => {
          
          
              db.collection('user').doc(userId).update({contactList:firebase.firestore.FieldValue.arrayUnion(val.phoneNumber)}).then(() => {
              db.collection('user').doc(userId).update({datingPoolList:firebase.firestore.FieldValue.arrayRemove(val.phoneNumber)})
          }) 
            
          
    }
    const nameComputer = (item, type) => {
     if(computeName(item).length > 15){
          return <Text style = {{fontWeight:'bold',}}>{computeName(item).substring(0,15)}..'{type} </Text> 
     }
     return <Text style = {{fontWeight:'bold',}} >{computeName(item)}'{type} </Text> 
}
    
//     useEffect(() => {
//      async function namer(){
//      if(user.datingPoolList.length > 0){
         
//      const onResult = db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get().then(async onResult => {
//         const data = await onResult.docs.map(val => val.data());
//         function applyToIncluded(val){
//               return {...val, invitationSent:true}
//         }
//         const result = filterGamer(data, 'phoneNumber', user.invitations, null,applyToIncluded)
//         //console.log(result)
//      //    console.log("exlucded"+result.excludedObjects.length)
//      //    console.log("included"+result.includedObjects.length)


            
//      //    setDatingPoolList([...result.excludedObjects, ...result.includedObjects]);
//      setDatingPoolList(data)
//      }).catch(error => console.log(error.message))
//      }
//      if(user.datingPoolList.length == 0){
         
//         setDatingPoolList([])
//      }     
     
      
// }
// namer()
// },[])
async function namer12(){
     console.log("namer was called")
     if(user.datingPoolList.length > 0){
          // const checkerResult = await Promise.all(user.datingPoolList.map(async val => {
          //      return await db.collection('user').doc(val).get().then(onDoc => {
          //        if(onDoc.exists){
          //          return onDoc.data()
          //        }
          //        return null; 
          //      })
               
          //     }))
          //     const finalChecker = checkerResult.filter(val => val !== null); 
          const checkerResult = await db.collection('user').get().then(onResult => {
               const users =  onResult.docs.map(val => val.data());
               console.log("user length is"+users.length) 
               const result = users.filter(person => user.datingPoolList.includes(person.phoneNumber))
               return result; 
            }) 
              const finalChecker = checkerResult.filter(val => val !== null);
              setDatingPoolList(finalChecker)     
         
     // const onResult = db.collection('user').where(firebase.firestore.FieldPath.documentId(), 'in', user.datingPoolList).get().then(async onResult => {
     //    const data = await onResult.docs.map(val => val.data());
     //    function applyToIncluded(val){
     //          return {...val, invitationSent:true}
     //    }
     //    const result = filterGamer(data, 'phoneNumber', user.invitations, null,applyToIncluded)
     //    console.log(result)
     // //    console.log("exlucded"+result.excludedObjects.length)
     // //    console.log("included"+result.includedObjects.length)


            
     // //    setDatingPoolList([...result.excludedObjects, ...result.includedObjects]);
     // setDatingPoolList(data)
     // }).catch(error => console.log(error.message))
     }
     if(user.datingPoolList.length == 0){
         
        setDatingPoolList([])
     }     
     
      
}
useFocusEffect(
     React.useCallback(() => {
       console.log("i was called")   
       
       namer12()
     }, [user.datingPoolList])
   );
console.log("length is")
console.log(user.datingPoolList.length)

const updateLocationList = () => {
  if(Object.keys(datingFlatList).length){
      const copy = datingPoolList.concat();  
      const index = copy.findIndex(val => val.phoneNumber == datingFlatList.client); 
      if(index !== -1){
       copy[index].state = datingFlatList.state; 
       copy[index].subLocality = datingFlatList.subLocality; 
       setDatingPoolList(copy)
       //setDatingFlatlist({})   
          

      } 
  }    
}

const updateInvitation = () => {
     if(inviteToPlay){
         const copy = datingPoolList.concat();  
         const index = copy.findIndex(val => val.phoneNumber == inviteToPlay); 
         if(index !== -1){
          copy[index].invitationSent = true;  
           
          setDatingPoolList(copy)
          //setDatingFlatlist({})   
             
   
         } 
     }    
   }
   

// useFocusEffect(
//      React.useCallback(() => {
//        console.log("i was called")   
//        updateLocationList()
//        updateInvitation()
//      }, [datingFlatList,inviteToPlay])
//    );




     const renderIsUser = (item) => {
           if(item.appUser){
                 return (
                    <View>
                     <View style={{
                       borderStyle: 'dotted',
                       borderWidth: 2,
                       borderRadius: 1,
                       borderColor:'grey',
                        marginBottom:10,
                        marginTop: 10,
                     }}/>    
                    <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10,marginBottom:15}}>
                    <Text style = {{fontWeight:'bold'}}> View Profile </Text>

                    <TouchableOpacity disabled = {computePoints(user.points) >= 390 ? false:true} onPress = {() => navigation.navigate('ClientView', {client:item})}>
                    <AntDesign name="eye" size={24} color="black" />
               {computePoints(user.points) <= 390 ? <TouchableOpacity style = {{backgroundColor:'grey', position:'absolute', left:7, bottom:35}} onPress = {() => navigation.navigate('PointsRequired')}>
               <Entypo name="lock" size={20} color="red" style = {{position:'absolute', }}/>
               </TouchableOpacity>:null}
                    </TouchableOpacity>
                    
           
                   </View>
                   <View style={{
                       borderStyle: 'dotted',
                       borderWidth: 2,
                       borderRadius: 1,
                       borderColor:'grey',
                        marginBottom:10,
                        marginTop: 10,
                     }}/>
                     <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20}}>
                     <Text style = {{fontWeight:'bold',}}>Remove from Dating Pool</Text>
                     <TouchableOpacity onPress = {() => {_sendToServer(item)}}>
                     <FontAwesome name="trash" size={24} color="black" />
                     </TouchableOpacity>
                     </View> 
                     </View>  
                 )
           }
           return (
               <View>
                    <View style={{
                  borderStyle: 'dotted',
                  borderWidth: 2,
                  borderRadius: 1,
                  borderColor:'grey',
                   marginBottom:10,
                   marginTop: 10,
                }}/>
               <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10,marginBottom:15}}>
               <Text style = {{fontWeight:'bold'}}> View Profile </Text>
               <TouchableOpacity disabled = {computePoints(user.points) >= 390 ? false:true} onPress = {() => navigation.navigate('ClientView', {client:item})}>
                    <AntDesign name="eye" size={24} color="black" />
               {computePoints(user.points) <= 390 ? <TouchableOpacity style = {{backgroundColor:'grey', position:'absolute', left:7, bottom:35}} onPress = {() => navigation.navigate('PointsRequired')}>
               <Entypo name="lock" size={20} color="red" style = {{position:'absolute', }}/>
               </TouchableOpacity>:null}
                    </TouchableOpacity>
      
              </View>
              <View style={{
                  borderStyle: 'dotted',
                  borderWidth: 2,
                  borderRadius: 1,
                  borderColor:'grey',
                   marginBottom:10,
                   marginTop: 10,
                }}/>
                <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20,marginTop:20}}>
                <Text style = {{fontWeight:'bold',}}>Remove from Dating Pool</Text>
                <TouchableOpacity onPress = {() => {_sendToServer(item)}}>
                <FontAwesome name="trash" size={24} color="black" />
                </TouchableOpacity>
                </View> 
                <View style={{
     borderStyle: 'dotted',
     borderWidth: 2,
     borderRadius: 1,
     borderColor:'grey',
     marginBottom:10,
     marginTop: 10,
     }}/>
     <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20,marginTop:20}}>
      
     {nameComputer(item,'sex')}
     
     
     <View style = {{flexDirection:"row",justifyContent:"space-around"}}>
     <TouchableOpacity style = {{marginRight:20}} onPress = {() => {addMale(item)}}>
     <FontAwesome name="male" size={30} color={item.gender == 'male' ? 'green':'black'} />

     </TouchableOpacity>
     <TouchableOpacity onPress = {() => {addFemale(item)}}>  
     <FontAwesome name="female" size={30} color={item.gender == 'female' ? 'green':'black'}  />
     </TouchableOpacity>
     </View>
     </View>
     <View style={{
     borderStyle: 'dotted',
     borderWidth: 2,
     borderRadius: 1,
     borderColor:'grey',
     marginBottom:10,
     marginTop: 10,
     }}/>
     {/* <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20}}>
     {nameComputer(item, 'Orientation')}
     <View style = {{flexDirection:"row",justifyContent:"space-around"}}>
     <TouchableOpacity style = {{marginRight:20}} disabled = {item.matchMaker == userId ? false:true}>
     <FontAwesome name="male" size={30} color="green" />
     </TouchableOpacity>
     <TouchableOpacity style = {{marginRight:20}} disabled = {item.matchMaker == userId ? false:true}>
     <FontAwesome name="female" size={30} color="black" />
     </TouchableOpacity>
     <TouchableOpacity disabled = {item.matchMaker == userId ? false:true}>
     <Ionicons name="ios-people" size={30} color="black" />
     </TouchableOpacity>
     </View>
     </View> */}
     {/* <View style={{
     borderStyle: 'dotted',
     borderWidth: 2,
     borderRadius: 1,
     borderColor:'grey',
     marginBottom:10,
     marginTop: 10,
     }}/> */}
     <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20, zIndex:1000,marginTop:20}}>
     {nameComputer(item, 'Age')}
     <TouchableOpacity>
     <DropDownPicker
     placeholder = {`${item.minAge} -  ${item.maxAge} years`} 
     
items={[

{label: '15 to 19 years', value: {minAge:15, maxAge:19}, selected:item.minAge == 15 && item.maxAge == 19 ? true : false},
{label: '20 to 24 years', value: {minAge:20, maxAge:24}, selected:item.minAge == 20 && item.maxAge == 24 ? true : false},
{label: '25 to 29 years', value: {minAge:25, maxAge:29}, selected:item.minAge == 25 && item.maxAge == 29 ? true : false},
{label: '30 to 34 years', value: {minAge:30, maxAge:34}, selected:item.minAge == 30 && item.maxAge == 34 ? true : false},
{label: '35 to 39 years', value: {minAge:35, maxAge:39}, selected:item.minAge == 35 && item.maxAge == 39 ? true : false},
{label: '40 to 44 years', value: {minAge:40, maxAge:44},selected:item.minAge == 40 && item.maxAge == 44 ? true : false}, 
{label: '45 to 49 years', value: {minAge:45, maxAge:49},selected:item.minAge == 45 && item.maxAge == 49 ? true : false},
{label: '50 to 54 years', value: {minAge:50, maxAge:54}, selected:item.minAge == 50 && item.maxAge == 54 ? true : false},
{label: '55 to 59 years', value: {minAge:55, maxAge:59}, selected:item.minAge == 55 && item.maxAge == 59 ? true : false},

]}
onPress = {() => {console.log("pressed")}}

containerStyle={{height: 40, width:150, }}
style={{}}
itemStyle={{

backgroundColor:"white", 
fontColor:"white",
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa', zIndex:100}}
onChangeItem={namer => addAge(item, namer)}

/>
     </TouchableOpacity>
     </View>
     <View style={{
     borderStyle: 'dotted',
     borderWidth: 2,
     borderRadius: 1,
     borderColor:'grey',
     marginBottom:10,
     marginTop: 10,
     }}/>
        <View style = {{flexDirection:'row', justifyContent:'space-between', marginBottom:20, alignItems:'center',marginTop:20}}>
                      <View style = {{flexDirection:'row',alignItems:'center'}}>
                       {item.profilePic ? <SingleImageView image = {item.profilePic} style = {{marginRight:10}}/>:<MaterialIcons name = "account-circle" size = {24} color = "black" style = {{marginRight:10}}/>}    
                       
                      {nameComputer(item, 'Photo')}
                      </View>   
                      <TouchableOpacity onPress = {() => addPhoto(item)}>
                      <Text style = {{fontWeight:'bold'}}>Add Photo</Text>
                      </TouchableOpacity>

                      </View>
                      <View style={{
     borderStyle: 'dotted',
     borderWidth: 2,
     borderRadius: 1,
     borderColor:'grey',
     marginBottom:10,
     marginTop: 10,
     }}/>
     <View style = {{flexDirection:'row', alignItems:'center',  marginBottom:20, marginTop:15,justifyContent:'space-between'}}>
                      <View>
                      {nameComputer(item, 'location')}
                      <Text style = {{fontSize:10,fontStyle:'italic', maxWidth:200,marginTop:5}}>{item.subLocality} {item.subLocality ? ",":null} {item.state}</Text>
                      </View>
                      <TouchableOpacity onPress = {() => navigation.navigate('FriendsLocation', {client:item})}>
                      <Text style = {{fontWeight:'bold'}}>Change Location</Text>
                      </TouchableOpacity>


                      </View>  
                      <View style={{
     borderStyle: 'dotted',
     borderWidth: 2,
     borderRadius: 1,
     borderColor:'grey',
     marginBottom:10,
     marginTop: 10,
     }}/>
                      <View style = {{flexDirection:'row',alignItems:'center', justifyContent:'space-between',marginBottom:20,marginTop:20}}>
                      {item.invitedToApp ? <Text style = {{fontWeight:'bold',}}>INVITATION SENT</Text>:<Text style = {{fontWeight:'bold',}}>INVITE TO PLAY</Text>}
                      {item.invitedToApp ? <View><AntDesign name="checkcircle" size={24} color="black" /></View>:<TouchableOpacity onPress = {() => navigation.navigate('Invitetoplay',{client:item, page:'friends'})}>
                      <Entypo name="mail" size={24} color="black" />
                      </TouchableOpacity>}
                      </View>
           

                </View> 
           )


     }
     console.log(user.datingPoolList)
     
     const renderItem = ({item, index}) => (
          <View key = {index.toString()} style = {{ marginLeft:30, marginRight:30,}}>
          <View style = {{borderBottomWidth:1, borderBottomColor:"black", width:Dimensions.get('window').width - 60,marginBottom:30,}}/>
          
          <View style = {{flexDirection:"row", justifyContent:'space-between',marginBottom:20}}>
          <View style = {{flexDirection:"row", alignItems:"center"}}>
          {item.profilePicSmall ?<SingleImageView image = {item.profilePicSmall} style = {{marginRight:10}} />:<MaterialIcons name="account-circle" size={30} color="black" />}
          <Text style = {{marginLeft:10,marginBottom:10,fontWeight:"bold",maxWidth:100,}} numberOfLines = {2}>{computeName(item)}</Text>
          
          </View>
          
          {   
               item.caret ? 
          <TouchableOpacity onPress = {() => setCaretFalse(item)}><AntDesign name="up" size={24} color="black" /></TouchableOpacity>:<TouchableOpacity onPress = {() => setCaretTrue(item)}><AntDesign name="down" size={24} color="black" /></TouchableOpacity>}

          </View>
          <Text style = {{alignSelf:'center',fontWeight:'bold',marginBottom:10}}> {item.votes.length > 0 ? item.votes.length : 0} votes by {item.matchMakers.length} {item.matchMakers.length > 1 ? 'friends':'friend'}</Text>
          { item.caret ? 
          <View>
           {renderIsUser(item)}
            
     
            </View>
            :null}    
          </View>
         
     )
     const checkAgeSet = (minAge:number, maxAge:number) => {
          if(minAge >= 15 && maxAge <= 19){
               return 0; 
          }
          if(minAge >= 20 && maxAge <= 24){
             return 1; 
          }
          if(minAge >= 25 && maxAge <= 29){
             return 2; 
          }
          if(minAge >= 30 && maxAge <= 34){
             return 3; 
          }
          if(minAge >= 35 && maxAge <= 39){
             return 4; 
          }
          if(minAge >= 40 && maxAge <= 44){
             return 5; 
          }
          if(minAge >= 45 && maxAge <= 49){
             return 6; 
          }
          if(minAge >= 50 && maxAge <= 54){
             return 7; 
          }
          if(minAge >= 55 && maxAge <= 59){
             return 8; 
          }
     }
     
     const [namer, setNamer] = useState(1)
     
          const filteredEmails = datingPoolList.filter(createFilter(search, KEYS_TO_FILTERS))
          

          const _checkCaret = (val) => {
               const result = caret.filter(val1 => (
                    val._id == val1._id
               ))
               return result[0].caret; 
          }
          const setCaretTrue = (val) => {
               const data = datingPoolList.concat(); 
               const index = data.findIndex(val1 => val1.phoneNumber == val.phoneNumber); 
               data[index].caret = true; 
               setDatingPoolList(data)
          }
          const setCaretFalse = (val) => {
              const data = datingPoolList.concat() 
              const index = data.findIndex(val1 => (
                   val.phoneNumber == val1.phoneNumber
              ))
              data[index].caret = false; 
              setDatingPoolList(data); 
          }
          const addMale = (obj => {
                
               const data = datingPoolList.concat(); 
               const index = data.findIndex(val1 => val1.phoneNumber == obj.phoneNumber)     
               data[index].gender = 'male'; 
               setDatingPoolList(data); 
               db.collection('user').doc(obj.phoneNumber).update({gender:'male'});
                
               })
               const addFemale = (obj => {
               const data = datingPoolList.concat(); 
               const index = data.findIndex(val1 => val1.phoneNumber == obj.phoneNumber)     
               data[index].gender = 'female'; 
               setDatingPoolList(data); 
               db.collection('user').doc(obj.phoneNumber).update({gender:'female'});
               })
               
               const addLocation = (obj => {
                     
               })

               const addPhoto = (async obj => {
                      
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
      
    

    let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.All});
    
    
      
      const response = await fetch(pickerResult.uri); 
        const blob = await response.blob(); 
        const namer = Math.random().toString(36).substring(2);
        const ref = firebase.storage().ref().child("images/"+ namer); 
        await ref.put(blob)
        const result1 = await ref.getDownloadURL();
        const cloner = datingPoolList.concat();  
        const objIndex = cloner.findIndex(val => val.phoneNumber == obj.phoneNumber);
        cloner[objIndex].profilePic = result1;  
        setDatingPoolList(cloner); 
        
       db.collection('user').doc(obj.phoneNumber).update({profilePic:result1}); 
    
    
    })
               const addAge = ((obj, item) => {
                     const data = datingPoolList.concat(); 
                     const index = data.findIndex(val => val.phoneNumber == obj.phoneNumber); 
                     data[index].minAge = item.value.minAge; 
                     data[index].maxAge = item.value.maxAge; 
                     const age = (item.value.maxAge + item.value.minAge)/2; 
                     const ageSet = checkAgeSet(item.value.minAge,item.value.maxAge)
                     db.collection('user').doc(obj.phoneNumber).update({minAge:item.value.minAge, maxAge:item.value.maxAge,age, ageSet})
                     
               })
          
               return (
                    <View style = {{flex:1,}}>
                    <View style = {{flex:0.3}}>
               <View style = {{flexDirection:'row', marginLeft:50, alignItems:'center'}}>
              <Text style = {{alignSelf:'center',  marginTop:30, fontWeight:'bold', marginBottom:20, fontSize:17 }}>
                  Click to View a friends Profile
              </Text>
              <TouchableOpacity onPress = {() => navigation.navigate('BulkInvite')}>
              <Entypo name="mail-with-circle" size={24} color="black" style = {{marginLeft:20, marginTop:5}}/>
              </TouchableOpacity>
              </View>                
              <SearchBar
              lightTheme
              round
              containerStyle = {{marginLeft:15, marginRight:15}}
              searchIcon={{ size: 24 }}
              onChangeText={text => setSearch(text)}
              placeholder="search"
              value={search}
            />
            <Text h5 style = {{alignSelf:"center",marginTop:30,fontWeight:"bold",marginBottom:30}}> {datingPoolList.length} friends in your friends list </Text>
            </View>
            <View style = {{flex:0.7}}>
            <ImageView visible = {visible} images = {[{url:currentUser}]} setVisible = {setVisible}/>  
               
            <FlatList
        data={filteredEmails}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.phoneNumber+index.toString()}
     //    contentInset={{  top: 0, left: 0, bottom: 200 }}

        //extraData={inviteToPlay}
      />  
                
             
             </View>
             
            </View>)
        
        
     
}




export default function ProfilePool({navigation}){
//const [uploadContacts1, {data}] = useMutation(UPLOAD_CONTACTS);
const [namer, setNamer] = useState(1); 
const [selected, setSelected] = useState('friends'); 
//const dating = useFetchDatingPool(); 
const dating = useFetchDatingPool(navigation)
const contact = useFetchContactPool(navigation);
const _uploadContacts = async () => {
     const { status } = await Contacts.requestPermissionsAsync(); 
     if (status === 'granted') {
         const { data } = await Contacts.getContactsAsync({
           fields: [Contacts.Fields.PhoneNumbers],
         });
         if (data.length > 0) {
           const contact = data;
           
           const finaler = contact.map(val => {
                return {
                    name:val.name, 
                    id:val.id, 
                    firstname:val.firstName, 
                    phoneNumbers:val.phoneNumbers.map(val1 => {
                         return {
                            id:val.id, 
                            digits:val1.digits, 
                            number:val1.number
                        }
                    })
                }
           })
           
           const networkData = {data:finaler}; 
           //uploadContacts1({variables:{contacts:networkData}}); 
           }
       }
 }
//  useEffect(() => {
//     _uploadContacts()      
//  }, [namer])
const insets = useSafeAreaInsets();

return(
<View style = {{flex:1,paddingTop:insets.top}} onPress = {Keyboard.dismiss}>
<View style = {{flex:1}}>
<View style = {{flexDirection:"row",marginLeft:20,justifyContent:'center', marginTop:20}}>

<Button title = "Friends" type = {"outline"} raised = {true} containerStyle = {{width:150}}
onPress = {() => setSelected("friends")}
buttonStyle = {{backgroundColor:selected == "friends" ? "#a8b8e3":"white", color:"white"}}
titleStyle = {{color:selected == "friends" ? "white":"black", fontWeight:"bold"}}
>

</Button>
<Button title = "Contacts"  type = {"outline"} raised = {true} containerStyle = {{width:150, backgroundColor:"blue"}}
onPress = {() => setSelected('contacts')}
buttonStyle = {{backgroundColor:selected == "contacts" ? "#a8b8e3":"white", color:"white"}}
titleStyle = {{color:selected == "contacts" ? "white":"black", fontWeight:"bold"}}
>
    
</Button>

</View>
{selected == 'contacts'?  contact : dating}
</View>

</View>
)
}