import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Row } from 'react-native-easy-grid';
import RecordsOfWallet from './recordsOfWallet.js';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XStorage } from 'react-native-easy-app';


  export const RNStorage = {
       userUuid: null
   };

export default function AdminCode({ route, navigation }) {
 const { walletUuid } = route.params;
 const { userUuid } = route.params;
   const { subsType } = route.params;
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
    	"userStatus":"ADMIN",
    	"userUuid": RNStorage.userUuid,
    	"walletUuid": walletUuid
  	})
    };

const handleBack = () => {navigation.addListener("beforeRemove", e => {
      console.log("Back");
      navigation.push('WalletSubs');});
      };

    const fetchData = async () => {
      const res = await fetch(
        'http://45.33.71.199:31000/wallet/getInviteCode', requestOptions
      );
      const json = await res.json();
      console.log(json);
      setData(json.content);
    };

useEffect(() => {
handleBack();
    fetchData();
  }, [setData]);
  
 
  const InviteCode = () => {
  return (<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
  paddingTop: '50%'}}>
  <View>
              <Text style={{ textAlign: 'left', marginLeft:'5%'}}>
               You can invite admin to your wallet
            </Text>
 </View>
   <View>
              <Text style={{ textAlign: 'left', marginLeft:'5%'}}>
               by sending this code:
            </Text>
 </View>
            <Text style={{ textAlign: 'center', marginRight:'10%'}}>
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
<TouchableOpacity onPress={copyToClipboard}> 
         <View>
           <Text style={{ textAlign: 'center', marginLeft:'55%', borderWidth: 1, fontSize: 20, backgroundColor: 'black', color:'white',
           marginTop: '10%' }}>
               Copy the code
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
