import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { StyleSheet, View } from "react-native";
import { Row } from 'react-native-easy-grid';
export default function RecordsOfWallet() {
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

const list = data.map((item) =>
<ListItem key={item.uuid}>
<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
<View>
<Text style={{ textAlign: 'left'}}>{item.title}</Text>
<Text style={{ textAlign: 'right'}}>{item.description}</Text>
</View>
<View>
<Text>{item.subsType}</Text>
<Text>{item.totalSum}</Text>
</View>
</View>
</ListItem>
);
return (
<Container>
<Header />
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
