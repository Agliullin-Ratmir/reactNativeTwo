import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form } from 'native-base';
import { PermissionsAndroid, StyleSheet, View, TouchableOpacity, RefreshControl, NativeModules } from "react-native";
import { Row } from 'react-native-easy-grid';
import RecordsOfWallet from './recordsOfWallet.js';
import NewWallet from './newWallet.js';
import PutInviteCode from './putInviteCode.js';
import EditWallet from './editWallet.js';
import StartPage from './startPage.js';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, MenuContext
} from 'react-native-popup-menu';
import PTRView from 'react-native-pull-to-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XStorage } from 'react-native-easy-app';
import DeviceInfo from 'react-native-device-info';
import RNSimData from "react-native-sim-data";
import { openDatabase } from 'react-native-sqlite-storage';

  export const RNStorage = {
       userUuid: null
   };

export default function WalletSubs({ navigation }) {
const { CustomModule } = NativeModules;

var db = openDatabase({ name: 'UserDB.db' });
 const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [refreshing, setRefreshing] = useState(false);
  
const [unsubWallet, setUnsubWallet] = useState();
const [unsubUser, setUnsubUser] = useState();
 
     const fetchData = async () => {
         setRefreshing(true);
      const res = await fetch(
        'http://45.33.71.199:31000/user/subscriptions?uuid=f64a8b88-3d2c-4c19-8a38-fc595f352008',
      );
      const json = await res.json();
      setData(json);
      setRefreshing(false)
    };
    
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('user_uuid', JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}  


   const makePayment = () => {
const res = CustomModule.hello("fs");
//CustomModule.show("Hi", 10);
    console.log(res);
   alert(res);
  };
  
   const initCallback = () => {
       RNStorage.userUuid = 'f64a8b88-3d2c-4c19-8a38-fc595f352008'; 
       //RNStorage.userUuid = '06e2097f-d5b9-407e-aec8-cc2f335708cb'; 
  };

  XStorage.initStorage(RNStorage, AsyncStorage, initCallback); 
    
  
    useEffect(() => {
   
     XStorage.initStorage(RNStorage, AsyncStorage, initCallback); 
    fetchData();}, [setData]);
  
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
      

const handleRemove = async (userUuid, walletUuid, subsType) => {
      if (subsType != 'OWNER') {
      alert("You can't remove the wallet, because you are not an owner")
      } else {
      var uri = 'http://45.33.71.199:31000/wallet/deleteWallet?userUuid=' +
      userUuid + '&walletUuid=' + walletUuid;
      console.log(uri);
      const res = await fetch(uri);
      navigation.push('WalletSubs')
      }
      };
      
const handleEditButton = (userUuid, walletUuid, description, title, subsType) => {
      if (subsType == 'USER') {
      alert("You can't edit the wallet, because you are an user")
      } else {
      navigation.push('EditWallet', {walletUuid: walletUuid, title: title,
        description: description, userUuid: '06e2097f-d5b9-407e-aec8-cc2f335708cb'});
      }
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
        <MenuOption onSelect={() => handleEditButton('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid,
        item.description, item.title, item.subsType)} text='Edit' />
        <MenuOption onSelect={() => {
        setUnsubUser('06e2097f-d5b9-407e-aec8-cc2f335708cb');
        setUnsubWallet(item.uuid);
        handleUnsubscribe('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid);}}>
          <Text style={{color: 'red'}}>Unsubscribe</Text>
        </MenuOption>
       <MenuOption onSelect={() => {
        handleRemove('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid, item.subsType);}}
        text='Remove' />
      </MenuOptions>
    </Menu>
 </View>
 </ListItem>
);

const refreshedList = () => {
return (
<List refreshControl={
          <RefreshControl refreshing={true} onRefresh={fetchData} />
        }>
{list}
</List>
);
}

const saveToDB = () => {
 db.transaction(function (txn) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Users_Table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nickname VARCHAR(30), pin_code VARCHAR(4), user_uuid VARCHAR(255))',
              []
      );
    });
    
 db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Users_Table (nickname, pin_code, user_uuid) VALUES (?,?,?)',
        ['Superman', '1234', 'f64a8b88-3d2c-4c19-8a38-fc595f352008'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Data Inserted Successfully....');
          } else Alert.alert('Failed....');
        }
      );
    });
}

const deleteFromDB = () => {
 db.transaction(function (txn) {
            txn.executeSql(
              'DROP TABLE IF EXISTS Users_Table',
              []
      );
    });
}

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
<PTRView onRefresh={fetchData}>
<Content>
<List refreshControl={
          <RefreshControl refreshing={true} onRefresh={fetchData} />
        }>
{list}
</List>
</Content>
</PTRView>
<View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
height: "7%", backgroundColor: 'black'}}>
<TouchableOpacity onPress={() => makePayment()}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingLeft:"10%", paddingTop:"2%"}}>
               Buy via the Pay
            </Text>
            </View>
         </TouchableOpacity>
         
<TouchableOpacity onPress={() => saveToDB()}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingRight:"10%", paddingTop:"2%"}}>
               Buy via qr-code
            </Text>
            </View>
         </TouchableOpacity>
</View>
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
