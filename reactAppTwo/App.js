import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './screens/components/startPage.js';
import SignUp from './screens/components/signUp.js';
import WalletSubs from './screens/components/walletSubscriptionItem.js';
import RecordsOfWallet from './screens/components/recordsOfWallet.js';
import RecordInfo from './screens/components/recordInfo.js';
import NewWallet from './screens/components/newWallet.js';
import EditWallet from './screens/components/editWallet.js';
import NewRecord from './screens/components/newRecord.js';
import EditRecord from './screens/components/editRecord.js';
import AdminCode from './screens/components/adminCode.js';
import UserCode from './screens/components/userCode.js';
import PutInviteCode from './screens/components/putInviteCode.js';
import { MenuProvider } from 'react-native-popup-menu';
import { HeaderBackButton } from 'react-navigation';
import { openDatabase } from 'react-native-sqlite-storage';


  export const RNStorage = {
       userUuid: null
   };


const Stack = createNativeStackNavigator();

export default function App() {
 const [data, setData] = useState(true);

var db = openDatabase({ name: 'UserDB.db' });

const selectFromDB = () => {

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM Users_Table",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            setData(false)
          } else {
          console.log('items:', res.rows);
          }
        }
      );
    })
}
    useEffect(() => {
    selectFromDB()
    });
    
    
    const RoutePages = () => {
return data ? (
    <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="SignUp" component={SignUp} />        
        <Stack.Screen name="WalletSubs" component={WalletSubs} />
        <Stack.Screen name="RecordsOfWallet" component={RecordsOfWallet} />
        <Stack.Screen name="RecordInfo" component={RecordInfo} />
        <Stack.Screen name="NewWallet" component={NewWallet} />
        <Stack.Screen name="EditWallet" component={EditWallet} />
        <Stack.Screen name="NewRecord" component={NewRecord} />
        <Stack.Screen name="EditRecord" component={EditRecord} />
        <Stack.Screen name="AdminCode" component={AdminCode} />
        <Stack.Screen name="UserCode" component={UserCode} />
        <Stack.Screen name="PutInviteCode" component={PutInviteCode} />
      </Stack.Navigator>
) : (
    <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="SignUp" component={SignUp} />        
        <Stack.Screen name="WalletSubs" component={WalletSubs} />
        <Stack.Screen name="RecordsOfWallet" component={RecordsOfWallet} />
        <Stack.Screen name="RecordInfo" component={RecordInfo} />
        <Stack.Screen name="NewWallet" component={NewWallet} />
        <Stack.Screen name="EditWallet" component={EditWallet} />
        <Stack.Screen name="NewRecord" component={NewRecord} />
        <Stack.Screen name="EditRecord" component={EditRecord} />
        <Stack.Screen name="AdminCode" component={AdminCode} />
        <Stack.Screen name="UserCode" component={UserCode} />
        <Stack.Screen name="PutInviteCode" component={PutInviteCode} />
      </Stack.Navigator>
)
};

  return (
  <MenuProvider>
    <NavigationContainer>
	<RoutePages/>
    </NavigationContainer>
    </MenuProvider>
  );
}
