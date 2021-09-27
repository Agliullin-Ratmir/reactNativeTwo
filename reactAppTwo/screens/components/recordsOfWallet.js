import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
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

export default function RecordsOfWallet({ route, navigation }) {
 const { walletUuid } = route.params;
  const { subsType } = route.params;
  const [url, setUrl] = useState();
  const [walletData, setWalletData] = useState();
 const [data, setData] = useState([]);
    useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '06e2097f-d5b9-407e-aec8-cc2f335708cb'
    };
    const fetchData = async () => {
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
    fetchData();
  }, [setData]);
const TotalAmount = () => {
let sum = 0.0;
  data.map((item) => sum = parseFloat(+parseFloat(sum) + +item.sum))
  console.log("sum: ", sum);
  return parseFloat(sum);
};

const handleRemove = async (userUuid, recordUuid) => {
var uuids = userUuid + ', ' + recordUuid;
  const removeRequestOptions = {
        method: 'PUT',
       headers: { 'Content-Type': 'application/text' },
        body: uuids
    };

    console.log(removeRequestOptions);
      var uri = 'http://45.33.71.199:31000/record/deleteRecord';
      console.log(uri);
      const res = await fetch(uri, removeRequestOptions);
      navigation.push('RecordsOfWallet', {walletUuid: walletUuid, subsType: subsType})
      };



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
</View>
</View>
</MenuTrigger>
      <MenuOptions>
      <MenuOption onSelect={() => navigation.push('EditRecord', {recordUuid: item.uuid, title: item.title,
        details: item.details, sum: item.sum.toString(), walletUuid: walletUuid, subsType:subsType, userUuid: '06e2097f-d5b9-407e-aec8-cc2f335708cb'})} text='Edit' />
 <MenuOption onSelect={() => {
        handleRemove('06e2097f-d5b9-407e-aec8-cc2f335708cb', item.uuid);}}
       disabled={subsType == 'USER'}
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
         <TouchableOpacity onPress={() => navigation.push('NewRecord', {walletUuid: walletData, subsType:subsType})}>
         <View>
            <Text style={{ textAlign: 'left', color:'white', fontSize:15, paddingBottom: 10}}>
               +New record
            </Text>
            </View>
            </TouchableOpacity>
 </View>
 
   <View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', alignSelf:"flex-start"}}>
<Text style={{ textAlign: 'center', color:'white', fontSize:20, width: 100}}>Total sum: <TotalAmount/></Text>
</View>
 
<View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<View></View>
<TouchableOpacity onPress={() => navigation.navigate('UserCode', {walletUuid: walletData, userUuid:  '06e2097f-d5b9-407e-aec8-cc2f335708cb'})}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingBottom: 10}}>
               Invite user
            </Text>
            </View>
         </TouchableOpacity>
 </View>
 <View style = {{flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<View></View>
<TouchableOpacity  onPress={() => navigation.navigate('AdminCode', {walletUuid: walletData, userUuid:  '06e2097f-d5b9-407e-aec8-cc2f335708cb'})}>
         <View>
           <Text style={{ textAlign: 'right', color:'white', fontSize:15, paddingBottom: 10}}>
              Invite admin
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
  }
});
