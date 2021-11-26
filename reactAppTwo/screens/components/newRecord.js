import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';
import RecordsOfWallet from './recordsOfWallet.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XStorage } from 'react-native-easy-app';



  export const RNStorage = {
       userUuid: null
   };


export default function NewRecord({ route, navigation }) {
 const { walletUuid } = route.params;
   const { subsType } = route.params;
 const [title, setTitle] = useState("")
  const [sum, setSum] = useState("")
const [details, setDetails] = useState("")
 const [data, setData] = useState();
 
        const initCallback = () => {
      console.log("userUuid from storage:");
       console.log(RNStorage.userUuid);
  };

  XStorage.initStorage(RNStorage, AsyncStorage, initCallback); 
 
const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    	"details":details,
    	"title":title,
    	"userUuid": RNStorage.userUuid,
    	"sum": sum,
    	"walletUuid": walletUuid
  	})
    };
 
const handleSubmit = async () => {
console.log(walletUuid);
      var uri = 'http://45.33.71.199:31000/record/new';
      const res = await fetch(
       uri, requestOptions
      );
      console.log(requestOptions);
      const json = await res.json();
      setData(json);
      navigation.push('RecordsOfWallet', {walletUuid: walletUuid, subsType:subsType})
      }
return (
<Container>
<Content>
<Form>
<Item>
<Input placeholder="Enter title"
onChangeText={text => setTitle(text)}/>
</Item>
<Item>
<Input placeholder="Enter details"
onChangeText={text => setDetails(text)}/>
</Item>
<Item>
<Input placeholder="Enter sum"  //change to https://www.npmjs.com/package/react-native-numeric-input
onChangeText={text => setSum(text)}/>
</Item>
 <View style = {{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<TouchableOpacity onPress={handleSubmit}>
         <View>
           <Text style={{ textAlign: 'center', marginLeft:'55%', borderWidth: 1, fontSize: 20, backgroundColor: 'black', color:'white',
           marginTop: '10%' }}>
               Submit
            </Text>
            </View>
         </TouchableOpacity>
      </View>
</Form>
</Content>
</Container>
);
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  }
});
