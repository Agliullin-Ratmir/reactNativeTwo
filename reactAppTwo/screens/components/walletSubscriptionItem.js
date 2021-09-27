import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordsOfWallet from './recordsOfWallet.js';
import NewWallet from './newWallet.js';
import PutInviteCode from './putInviteCode.js';
import EditWallet from './editWallet.js';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, MenuContext
} from 'react-native-popup-menu';


export default function WalletSubs({ navigation }) {
 const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  
const [unsubWallet, setUnsubWallet] = useState();
const [unsubUser, setUnsubUser] = useState();
  
    useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'http://45.33.71.199:31000/user/subscriptions?uuid=06e2097f-d5b9-407e-aec8-cc2f335708cb',
      );
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [setData]);
  
const TotalAmount = () => {
let sum = 0.0;
  data.map((item) => sum = parseFloat(+parseFloat(sum) + +item.totalSum))
  return parseFloat(sum);
};

const handleUnsubscribe = async (userUuid, walletUuid) => {
  const unsubRequestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    	 "userUuid":userUuid,
    	"walletUuid":walletUuid
  	})
    };

      console.log(unsubRequestOptions);
      var uri = 'http://45.33.71.199:31000/wallet/unsubscribe'
      const res = await fetch(
       uri, unsubRequestOptions
      );
      navigation.push('WalletSubs')
      };
      
      
const handleRemove = async (userUuid, walletUuid) => {
      var uri = 'http://45.33.71.199:31000/wallet/deleteWallet?userUuid=' +
      userUuid + '&walletUuid=' + walletUuid;
      console.log(uri);
      const res = await fetch(uri);
      navigation.push('WalletSubs')
      };

const list = data.reverse().map((item) =>
<ListItem key={item.uuid} onPress={() => navigation.push('RecordsOfWallet', {walletUuid: item.uuid, subsType: item.subsType})}>
<View style ={{width: '95%'}}>
<Menu>
      <MenuTrigger style = {{flex:1}} triggerOnLongPress={true}>
<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<View>
<Text style={{ textAlign: 'left'}}>{item.title}</Text>
<Text style={{ textAlign: 'right'}}>{item.description}</Text>
</View>
<View>
<Text>{item.subsType}</Text>
<Text>{item.totalSum}</Text>
</View>
</View>
</MenuTrigger>
      <MenuOptions style = {{flex:1}}>
              <MenuOption onSelect={() => navigation.push('RecordsOfWallet', {walletUuid: item.uuid, subsType: item.subsType})} text='Enter' />
        <MenuOption onSelect={() => navigation.push('EditWallet', {walletUuid: item.uuid, title: item.title,
        description: item.description, userUuid: '06e2097f-d5b9-407e-aec8-cc2f335708cb'})} text='Edit' />
        <MenuOption onSelect={() => {
        setUnsubUser('06e2097f-d5b9-407e-aec8-cc2f335708cb');
        setUnsubWallet(item.uuid);
        handleUnsubscribe('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid);}}>
          <Text style={{color: 'red'}}>Unsubscribe</Text>
        </MenuOption>
       <MenuOption onSelect={() => {
        handleRemove('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid);}}
       disabled={item.subsType != 'OWNER'}
        text='Remove' />
      </MenuOptions>
    </Menu>
 </View>
 </ListItem>
);

return (
<Container>
<Header style = {{backgroundColor: 'black', height: 80}}>
<View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<View></View>
         <TouchableOpacity onPress={() => navigation.push('NewWallet')}>
         <View>
            <Text style={{ textAlign: 'left', color:'white', fontSize:15, paddingBottom:10}}>
               +New wallet
            </Text>
            </View>
            </TouchableOpacity>
</View>
   <View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', alignSelf:"flex-start"}}>
<Text style={{ textAlign: 'center', alignSelf: 'center', color:'white', fontSize:20}}>Total sum: <TotalAmount/></Text>
 </View>
 <View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
 <View></View>
<TouchableOpacity onPress={() => navigation.push('PutInviteCode', {userUuid: '06e2097f-d5b9-407e-aec8-cc2f335708cb'})}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingBottom:10}}>
               Put invite code
            </Text>
            </View>
         </TouchableOpacity>
      </View>
</Header>
<Content>
<List>
{list}
</List>
</Content>
</Container>
);
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
  headerStyle: {
      backgroundColor: 'red'
    }
});
