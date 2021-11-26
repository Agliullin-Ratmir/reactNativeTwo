import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { StyleSheet, View } from "react-native";
import { Row } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XStorage } from 'react-native-easy-app';



  export const RNStorage = {
       userUuid: null
   };




export default function RecordInfo({ route, navigation }) {
 const { recordUuid } = route.params;
  const [url, setUrl] = useState();
 const [data, setData] = useState({});
 
        const initCallback = () => {
      console.log("userUuid from storage:");
       console.log(RNStorage.userUuid);
  };

  XStorage.initStorage(RNStorage, AsyncStorage, initCallback); 
 
    useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: RNStorage.userUuid
    };
    const fetchData = async () => {
      var uri = 'http://45.33.71.199:31000/record/get?recordUuid=' + recordUuid;
      const res = await fetch(
       uri, requestOptions
      );
      console.log(uri);
      setUrl(uri)
      const json = await res.json();
      console.log(json);
      setData(json);
    };
    fetchData();
  }, setData);

const list = 
<View>
<Text style={{ textAlign: 'left', fontSize:25}}>Title: {data.title}</Text>
<Text style={{ textAlign: 'left', fontSize:25}}>Details: {data.details}</Text>
<Text style={{ textAlign: 'left', fontSize:25}}>Sum: {data.sum}</Text>
</View>
return (
<Container>
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
