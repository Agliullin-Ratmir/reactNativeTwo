import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Row } from 'react-native-easy-grid';
import WalletSubs from './walletSubscriptionItem.js';


export default function PutInviteCode({ route, navigation }) {
 const { userUuid } = route.params;
 const [data, setData] = useState();
 const [inviteCode, setInviteCode] = useState("");
const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    	"inviteCode":inviteCode,
    	"userUuid": userUuid
  	})
    };

const handleSubscribe = async () => {
console.log(requestOptions);
      var uri = 'http://45.33.71.199:31000/wallet/subscribe';
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
<Input placeholder="Enter inviteCode"
onChangeText={text => setInviteCode(text)}/>
</Item>
 <View style = {{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<TouchableOpacity onPress={handleSubscribe}>
         <View>
           <Text style={{ textAlign: 'right', borderWidth:1 }}>
               Subscribe
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
