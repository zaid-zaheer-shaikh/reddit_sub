import {firebase} from './config';

interface lastMessage {
   _id:string, 
   createdAt:Date, 
   text:string, 
   user:{
       _id:string
   } 
}
interface point {
    point:number, 
    pointFor:string, 
    createdAt:Date
}
interface vote {
    answeredBy:string, 
    createdAt:Date, 
    dimension:string, 
    question:string
}


interface database {
 age:number, 
 
 chattedArray:[],
 contactList:[], 
 datingPoolList:[], 
 
 day:number, 
 empathetic:number, 
 creativity:number, 
 humor:number, 
 honest:number, 
 charisma:number, 
 narcissism:number,
 status:number, 
 wealthy:number, 
 looks:number, 
 inches:number, 
 feet:number, 
 firstName:string,
 gamePreview:boolean, 
 gender:string, 
 genderPreference:string, 
 hometown:string, 
 introMatches:[], 
 introRequest:[], 
 introSent:[], 
 job:string, 
 lastMessage:[lastMessage], 
 lastName:string, 
 latitude:number, 
 longitude:number, 
 matchMaker:string, 
 matchMakers:[], 
 maxAge:number, 
 minAge:number, 
 month:number, 
 name:string, 
 phoneNumber:string, 
 photos:[], 
 points:[point], 
 posted:boolean, 
 profilePic:string, 
 school:string, 
 seenChats:[], 
 seen:[], 
 seenClientMatches:[], 
 seenIntros:[], 
 seenMatches:[], 
 state:string, 
 subLocality:string, 
 suggestedMatches:[], 
 timeStamp:Date, 
 votes:[], 
 year:number

}


export const defaultDataObject:database = {

 age:0, 
 
 chattedArray:[],
 contactList:[], 
 datingPoolList:[], 
 
 day:0, 
 empathetic:0, 
 creativity:0, 
 humor:0, 
 honest:0, 
 charisma:0, 
 narcissism:0,
 status:0, 
 wealthy:0, 
 looks:0, 
 inches:0, 
 feet:0, 
 firstName:"",
 gamePreview:false, 
 gender:"", 
 genderPreference:"", 
 hometown:"", 
 introMatches:[], 
 introRequest:[], 
 introSent:[], 
 job:"", 
 lastMessage:[], 
 lastName:"", 
 matchMaker:"", 
 matchMakers:[], 
 maxAge:0, 
 minAge:0, 
 month:0, 
 name:"", 
 phoneNumber:"", 
 photos:[null, null, null, null, null,null], 
 points:[], 
 posted:false, 
 profilePic:"", 
 school:"", 
 seenChats:[], 
 seen:[], 
 seenClientMatches:[], 
 seenIntros:[], 
 seenMatches:[], 
 state:"", 
 subLocality:"", 
 suggestedMatches:[], 
 timeStamp:new Date(), 
 votes:[], 
 distancePreference:40, 
 minAgePreference:15, 
 maxAgePreference:60, 
 year:0 
}


export function defaultUsers(){
  const db = firebase.firestore();   
  const result = [
  Object.assign({}, defaultDataObject, {name:"Katherine Sanders",  phoneNumber:"+12", profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXUZMlvgFi1YBvZJS1o1FK52sacJN1QHZkCw&usqp=CAU", state:"California", latitude:37.81998026518036, longitude:-122.50078919197996}), 
  Object.assign({}, defaultDataObject, {name:"Amy Buckthorpe",  phoneNumber:"+121", profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpP8fFBA1mZvV1G6_6NqF42td-G-Y1JSOtVQ&usqp=CAU", state:"California", latitude:37.81998026518036, longitude:-122.50078919197996}), 
  Object.assign({}, defaultDataObject, {name:"Samantha Buckthorpe",  phoneNumber:"+1212", profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3vB-ESZUfxxEQHdJK3herR7dbif7iPwvgpw&usqp=CAU", state:"California", latitude:37.81998026518036, longitude:-122.50078919197996}), 
  Object.assign({}, defaultDataObject, {name:"Lisa Buckthorpe",  phoneNumber:"+12121", profilePic:"data:image/jpeg;base64,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", state:"California", latitude:37.81998026518036, longitude:-122.50078919197996}),
  Object.assign({}, defaultDataObject, {name:"Lucy Buckthorpe",  phoneNumber:"+121212", profilePic:"data:image/jpeg;base64,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", state:"California", latitude:37.81998026518036, longitude:-122.50078919197996}),



];    
result.map(val => {
    db.collection('user').doc(val.phoneNumber).set(val).then(() => console.log('user added'));     
})
  
}