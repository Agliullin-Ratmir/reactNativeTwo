import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';

export default function EditWallet({ route, navigation }) {
 const { title } = route.params;
 const { description } = route.params;
  const { walletUuid } = route.params;
   const { userUuid } = route.params;
 const [newTitle, setNewTitle] = useState(title);
 const [newDescription, setNewDescription] = useState(description);
const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    	"description":newDescription,
    	"title":newTitle,
    	"uuid":walletUuid
  	})
    };
 
const handleSubmit = async () => {
      var uri = 'http://45.33.71.199:31000/wallet/edit?userUuid=' + userUuid;
      const res = await fetch(
       uri, requestOptions
      );
      console.log(requestOptions);
      navigation.push('WalletSubs')
      }
return (
<Container>
<Content>
<Form>
<Item>
<Input value={newTitle}
onChangeText={text => setNewTitle(text)}/>
</Item>
<Item>
<Input value={newDescription}
onChangeText={text => setNewDescription(text)}/>
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
