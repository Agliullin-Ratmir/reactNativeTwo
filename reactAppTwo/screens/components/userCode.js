import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Row } from 'react-native-easy-grid';
import RecordsOfWallet from './recordsOfWallet.js';
import Clipboard from '@react-native-clipboard/clipboard';


export default function UserCode({ route, navigation }) {
 const { walletUuid } = route.params;
 const { userUuid } = route.params;
 const [data, setData] = useState();
const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    	"userStatus":"USER",
    	"userUuid": userUuid,
    	"walletUuid": walletUuid
  	})
    };

useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'http://45.33.71.199:31000/wallet/getInviteCode', requestOptions
      );
      const json = await res.json();
      setData(json.content);
    };
    fetchData();
  }, [setData]);
  
  const InviteCode = () => {
  return (<View>
            <Text style={{ textAlign: 'left', borderWidth:1 }}>
               {data}
            </Text>
            </View>
);
  }
  
  const copyToClipboard = () => {
    Clipboard.setString(data);
    alert("The code has been copied");
  };

return (
<Container>
<Content>
<Form>
<InviteCode/>
 <View style = {{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<TouchableOpacity  onPress={copyToClipboard}>
         <View>
           <Text style={{ textAlign: 'right', borderWidth:1 }}>
               Copy
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
