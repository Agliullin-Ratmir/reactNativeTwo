import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native'
import WalletSubscriptionItem from './screens/components/walletSubscriptionItem.js'

function App() {
  const [data, setData] = useState([]);

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

  return (
      data.map(item => (
          <View style={styles.container}>
        <Text key={item.uuid}>{item.title}</Text>
        </View>
      ))
  );
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
});

export default App;
