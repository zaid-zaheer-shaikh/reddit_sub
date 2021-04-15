import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList,Text } from 'react-native';
import { firebase } from '../../config';
import AppContext from '../../AppContext';
import { UserFactory, db } from './MatchList';

//@refresh reset

export function MatchChats({navigation}) {
  const myContext = useContext(AppContext);
  const { user, userId, setChatNotification, setChatterNotification, firebase, createChatThread, computeName } = myContext;
  const [chatList, setChatList] = useState([]);
  const handleChatPressed = (doc) => {
    
    db.collection('user').doc(userId).update({lastMessage:firebase.firestore.FieldValue.arrayUnion(doc.lastMessage._id)})
    navigation.navigate('ChatLatest', {mainer:doc}); 
}
  const renderVerticalList = ({ item }) => {
    const messageText = item.lastMessage.user._id == userId ? <Text numberOfLines = {1} style = {{width:300}}> You: {item.lastMessage.text}</Text>:<Text numberOfLines = {1} style = {{width:300}}> {item.lastMessage.text}</Text>
    return <View>
    <View style = {{flexDirection:'row', alignItems:'center', marginTop:20}}>
        
     <UserFactory user={item} onPress={handleChatPressed} />
     <View style = {{marginLeft:10}}>
     <Text style = {{fontWeight:'bold'}}>{computeName(item.clientUser)}</Text>    
     {messageText}
     </View>
    </View>
    </View>
  };
  useEffect(() => {
    if (user.chatted.length) {
      db.collection('matches').where(firebase.firestore.FieldPath.documentId(), 'in', user.chatted).onSnapshot(async (onResult) => {
        const data = onResult.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
        const result = data.map(val => {

          if (val.client2 == userId) {
            let a = val.client1;
            let b = val.client2;
            let temp;
            temp = a;
            a = b;
            b = temp;
            return { ...val, client1: a, client2: b };
          }
          return val;
        });

        //   const transformedWithUsers =  await Promise.all(result.map(async val => {
        //     return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, {clientUser:result.data()})) 
        //  }))
        const transformedWithUsers = await Promise.all(result.map(async (val) => {
          return await db.collection('user').doc(val.client2).get().then(async (result) => {
            return await db.collection('messages').doc(createChatThread(userId, result.data().phoneNumber)).collection('messages').orderBy('createdAt', 'desc').limit(1).get().then(onChatResult => {
              const lastNamer = onChatResult.docs.map(val => val.data());
              return Object.assign({}, val, { clientUser: result.data(), lastMessage: lastNamer[0] });
            });
          });
        }));
        //console.log(transformedWithUsers); 
         var filteredIntros = transformedWithUsers.filter(
            function(e) {
        
              return this.indexOf(e.lastMessage._id) < 0;
            },
           user.lastMessage
        );
        // console.log("filteredIntros")
        // console.log(filteredIntros)
        const resulter = transformedWithUsers.map(val => {
            if(val.lastMessage.user._id == userId){
                return {
                    ...val, seen:true 
                }
            }
            return {...val}
        })

        var filteredIntros = resulter.filter(
            function(e) {
        
              return this.indexOf(e.lastMessage._id) < 0;
            },
           user.lastMessage
        );
        
        const dataUsers = [];
        // if (user.lastMessage.length < 1) {
        //   setChatList(transformedWithUsers);
        //   setChatterNotification(true);
        // }
        // if (user.lastMessage.length > 0) {
        //   for (let x = 0; x < user.lastMessage.length; x++) {
        //     for (let y = 0; y < transformedWithUsers.length; y++) {
        //       if (user.lastMessage[x] == transformedWithUsers[y].lastMessage._id) {
        //         dataUsers.push({ ...transformedWithUsers[y], seen: true });

        //         break;
        //       }
        //       if (user.lastMessage[x] !== transformedWithUsers[y].lastMessage._id) {
        //         dataUsers.push({ ...transformedWithUsers[y] });
        //       }
        //     }
        //   }
        //   const resulter = dataUsers.filter(val => !val.seen);
        //   if (resulter.length > 0) {
        //     setChatterNotification(true);
        //   }
        //   if (resulter.length == 0) {
        //     setChatterNotification(false);
        //   }
        //   console.log("dater is"); 
        //   console.log(dataUsers.length)
          setChatList(resulter);
        // }

      });
    }

  }, [user.lastMessage, user.chatted]);

  return (
    <View>
      <FlatList
        data={chatList}
        renderItem={renderVerticalList}
        keyExtractor={item => item.id}

        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20, marginBottom: 20 }} />
    </View>
  );
}
