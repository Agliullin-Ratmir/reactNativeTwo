import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, HStack } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, MenuContext
} from 'react-native-popup-menu';
import RecordInfo from './recordInfo.js';
import NewRecord from './newRecord.js';
import AdminCode from './adminCode.js';
import UserCode from './userCode.js';
import EditRecord from './editRecord.js';
import PTRView from 'react-native-pull-to-refresh';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XStorage } from 'react-native-easy-app';
import { openDatabase } from 'react-native-sqlite-storage';



  export const RNStorage = {
       userUuid: null
   };

export default function RecordsOfWallet({ route, navigation }) {

var db = openDatabase({ name: 'UserDB.db' });

 const { walletUuid } = route.params;
  const { subsType } = route.params;
  const [url, setUrl] = useState();
  const [walletData, setWalletData] = useState();
 const [data, setData] = useState([]);
 
 
       const initCallback = () => {
      console.log("userUuid from storage:");
       console.log(RNStorage.userUuid);
  };

  XStorage.initStorage(RNStorage, AsyncStorage, initCallback); 
    
    useEffect(() => {
     XStorage.initStorage(RNStorage, AsyncStorage, initCallback); 
    fetchData();}, [setData]);
 
     const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: RNStorage.userUuid
    };
    const fetchData = async () => {
    console.log(requestOptions)
      var uri = 'http://45.33.71.199:31000/wallet/recordsOfWallet?walletUuid=' + walletUuid;
      const res = await fetch(
       uri, requestOptions
      );
      console.log(uri);
      setUrl(uri)
      setWalletData(walletUuid)
      const json = await res.json();
      setData(json);
    };
  
    
    
const TotalAmount = () => {
let sum = 0.0;
  data.map((item) => sum = parseFloat(+parseFloat(sum) + +item.sum))
  console.log("sum: ", sum);
  return parseFloat(sum);
};

const handleRemove = async (userUuid, recordUuid, subsType) => {
      if (subsType == 'USER') {
      alert("You can't remove the record, because you are an user")
      } else {
  const removeRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
    	"userUuid":userUuid,
    	"recordUuid":recordUuid
  	})
    };

    console.log(removeRequestOptions);
      var uri = 'http://45.33.71.199:31000/record/deleteRecord';
      console.log(uri);
      const res = await fetch(uri, removeRequestOptions);
      navigation.push('RecordsOfWallet', {walletUuid: walletUuid, subsType: subsType})
      }
      };

const handleEditButton = (recordUuid, details, sum, userUuid, walletUuid, title, subsType) => {
      if (subsType == 'USER') {
      alert("You can't edit the wallet, because you are an user")
      } else {
navigation.push('EditRecord', {recordUuid: recordUuid, title: title,
        details: details, sum: sum, walletUuid: walletUuid, subsType:subsType, userUuid: userUuid});
      }
      };
      
const getFromDB = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT nickname FROM Users_Table WHERE user_uuid='06e2097f-d5b9-407e-aec8-cc2f335708cb'",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log(temp);
        }
      );
    })
    }

const list = data.reverse().map((item) =>
<ListItem key={item.uuid} onPress={() => navigation.navigate('RecordInfo', {recordUuid: item.uuid})}>
<View style = {{width:'95%'}}>
<Menu>
      <MenuTrigger triggerOnLongPress={true}>
<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
<View>
<Text style={{ textAlign: 'left'}}>{item.title}</Text>
<Text style={{ textAlign: 'right'}}>{item.details}</Text>
</View>
<View>
<Text>{item.sum}</Text>
<Text style={{color: 'green'}}>By {item.userName}</Text>
</View>
</View>
</MenuTrigger>
      <MenuOptions>
      <MenuOption onSelect={() => handleEditButton(item.uuid, item.details, item.sum.toString(), '06e2097f-d5b9-407e-aec8-cc2f335708cb',
      walletUuid, item.title, subsType)} text='Edit' />
 <MenuOption onSelect={() => {
        handleRemove('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid, subsType);}}
        text='Remove' />
      </MenuOptions>
    </Menu>
 </View>
 </ListItem>
);

const bottomPanel = () => {
return (
<View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<Text> Buy
</Text>
</View>
);
}

const handleGetAdminCode = (walletData, userUuid, subsType) => {
      if (subsType == 'USER') {
      alert("You can't invite administator, because you are an user")
      } else {
      navigation.navigate('AdminCode', {walletUuid: walletData, userUuid:  '06e2097f-d5b9-407e-aec8-cc2f335708cb', subsType: subsType});
      }
      };

return (
<Container>
<Header style = {{backgroundColor: 'black', height: 110}}>

<View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<View></View>
         <TouchableOpacity onPress={() => navigation.push('NewRecord', {walletUuid: walletData, subsType:subsType})}>
         <View>
            <Text style={{ textAlign: 'left', color:'white', fontSize:15, paddingTop:30}}>
               +New record
            </Text>
            </View>
            </TouchableOpacity>
<TouchableOpacity onPress={() => navigation.push('WalletSubs')}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingBottom: 10}}>
             Back to Wallets
            </Text>
            </View>
         </TouchableOpacity>
 </View>
 
   <View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', alignSelf:"flex-start"}}>
<Text style={{ textAlign: 'center', color:'white', fontSize:20, width: 150, paddingRight:50}}>Total sum: <TotalAmount/></Text>
</View>
 
<View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<View>
</View>
<TouchableOpacity onPress={() => navigation.push('UserCode', {walletUuid: walletData, userUuid:  '06e2097f-d5b9-407e-aec8-cc2f335708cb'})}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingTop:30, paddingLeft:30}}>
               Invite user
            </Text>
            </View>
         </TouchableOpacity>
 <TouchableOpacity onPress={() => handleGetAdminCode(walletData, '06e2097f-d5b9-407e-aec8-cc2f335708cb', subsType)}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingBottom: 10, paddingLeft:30}}>
              Invite admin
            </Text>
            </View>
         </TouchableOpacity>
      </View>

</Header>
<Content>
<PTRView onRefresh={fetchData}>
<View>
<List>
{list}
</List>
</View>
</PTRView>
</Content>
<View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
height: "7%", backgroundColor: 'black'}}>
<TouchableOpacity onPress={() => alert("Pay")}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingLeft:"10%", paddingTop:"2%"}}>
               Buy via the Pay
            </Text>
            </View>
         </TouchableOpacity>
         
<TouchableOpacity onPress={() => getFromDB()}>
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
  }
});
