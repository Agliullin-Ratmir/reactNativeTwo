import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XStorage } from 'react-native-easy-app';



  export const RNStorage = {
       userUuid: null
   };


export default function NewWallet({ route, navigation }) {
 const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
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
    	"description":description,
    	"title":title,
    	"ownerUuid": RNStorage.userUuid
  	})
    };
 
const handleSubmit = async () => {
      var uri = 'http://45.33.71.199:31000/wallet/new';
      const res = await fetch(
       uri, requestOptions
      );
      console.log(requestOptions);
      const json = await res.json();
      setData(json);
      navigation.push('WalletSubs')
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
<Input placeholder="Enter description"
onChangeText={text => setDescription(text)}/>
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
