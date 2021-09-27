import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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


const Stack = createNativeStackNavigator();

function App() {
  return (
  <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WalletSubs">
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
    </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
