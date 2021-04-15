import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Line } from '../../src/common/Common';
import AppContext from '../../AppContext';
import { UserFactory, db } from './MatchList';
import { filterGamer } from '../../networking';

export function MatchesList({navigation}) {
  const myContext = useContext(AppContext);
  const { user, userId, setChatNotification, setChatterNotification, firebase } = myContext;
  const [matches, setMatches] = useState([]);
  const handleMatchPressed = (doc) => {
    db.collection('user').doc(user.phoneNumber).update({seenMatches:firebase.firestore.FieldValue.arrayUnion(doc._id)}); 
    navigation.navigate('ChatLatest', {mainer:doc});  
}
  const renderHorizontalList = ({ item }) => {
    return <UserFactory user={item} onPress={handleMatchPressed} />;
  };
  useEffect(() => {
    const unsubscribe = db.collection('matches').where('client1', '==', user.phoneNumber).onSnapshot(async (onResultClient1) => {
      const client1 = onResultClient1.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
      const client1Users = client1.filter(val => val.client2);
      const transformedWithUsers1 = await Promise.all(client1.map(async (val) => {
        return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, { clientUser: result.data() }));
      }));
      const dater = transformedWithUsers1.map(val => {
        return { ...val, createdAt: val.createdAt.toDate()};
      });
     
    
    const finalArray1 = dater; 
       const unsubscribe1 = db.collection('matches').where('client2', '==', user.phoneNumber).onSnapshot(async (onResultClient2) => {
         console.log("Second snapshot called")  
        let client2 = onResultClient2.docs.map(val => Object.assign({}, val.data(), { _id: val.id }));
        const transformed = client2.map(val => {
          let a = val.client1;
          let b = val.client2;
          let temp;
          temp = a;
          a = b;
          b = temp;
          return { ...val, client1: a, client2: b };
        });

        const transformedWithUsers = await Promise.all(transformed.map(async (val) => {
          return await db.collection('user').doc(val.client2).get().then(result => Object.assign({}, val, { clientUser: result.data() }));
        }));
        
        const finalArray = transformedWithUsers;
        const grangArray = [...finalArray1, ...finalArray];
        function applyToIncluded(val){
          return {...val, seen:true}  
        }
        const filteredBySeen = filterGamer(grangArray, '_id', user.seenMatches,null, applyToIncluded);     
        const grandestArray = [...filteredBySeen.excludedObjects, ...filteredBySeen.includedObjects];
        const filterByChatted = filterGamer(grandestArray, '_id', user.chatted, null,null); 

        
        if (user.seenMatches.length < filterByChatted.excludedObjects.length) {
          setChatNotification(true);
        }
        if (user.seenMatches.length >= filterByChatted.excludedObjects.length) {
          setChatNotification(false);
        }
        setMatches(filterByChatted.excludedObjects);

      });
    });

    return () => {
      unsubscribe();
    };

  }, [user.seenMatches, user.chatted, user.introMatches]);
  return (
    <View>
      <Line />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 15, marginTop: 10, marginBottom: 10 }}>Matches</Text>
      </View>
      <Line />
      <FlatList
        data={matches}
        renderItem={renderHorizontalList}
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20 }} />
      <Line />

    </View>
  );
}
