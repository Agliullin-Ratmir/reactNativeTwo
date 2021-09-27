import React, { useState, useEffect } from 'react';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from 'react-native-easy-grid';
export default function NewWallet({ route, navigation }) {
 const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
 const [data, setData] = useState();
 
const handleSubmit = () => {
}
return (
<Container>
<Header />
<Content>
<Form>
<Item>
<Input placeholder="Enter title"
onChangeText={text => setTitle(text)}/>
</Item>
<Item>
<Input placeholder="Enter description"
onChangeText={text => setDescription(text)}/>
</Item>
 <View style = {{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
<TouchableOpacity>
         <View>
           <Text style={{ textAlign: 'right', borderWidth:1 }}>
               Submit
            </Text>
            </View>
         </TouchableOpacity>
      </View>
</Form>
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
