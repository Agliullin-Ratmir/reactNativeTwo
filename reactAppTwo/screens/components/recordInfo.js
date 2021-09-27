import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { StyleSheet, View } from "react-native";
import { Row } from 'react-native-easy-grid';
export default function RecordInfo({ route, navigation }) {
 const { recordUuid } = route.params;
  const [url, setUrl] = useState();
 const [data, setData] = useState({});
    useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '06e2097f-d5b9-407e-aec8-cc2f335708cb'
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
<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
<View>
<Text style={{ textAlign: 'left'}}>{data.title}</Text>
<Text style={{ textAlign: 'right'}}>{data.details}</Text>
</View>
<View>
<Text>{data.sum}</Text>
</View>
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
