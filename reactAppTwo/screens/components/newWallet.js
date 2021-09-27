import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';
export default function NewWallet({ route, navigation }) {
 const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
 const [data, setData] = useState();
const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: {"description":description,"title":title,"ownerUuid":"06e2097f-d5b9-407e-aec8-cc2f335708cb"}
        body: JSON.stringify({
    	"description":description,
    	"title":title,
    	"ownerUuid":"06e2097f-d5b9-407e-aec8-cc2f335708cb"
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
           <Text style={{ textAlign: 'right', borderWidth:1 }}>
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
