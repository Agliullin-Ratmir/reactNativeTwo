import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import WalletSubscriptionItem from './components/walletSubscriptionItem.js'

class WalletSubscriptionScreen extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch('http://45.33.71.199:31000/user/subscriptions?uuid=06e2097f-d5b9-407e-aec8-cc2f335708cb', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            data: responseJson
         })
         console.log(responseJson);
      })
      .catch((error) => {
         console.error(error);
      });
   }
   render() {
      return (
    <FlatList
        data={this.state.data}
        renderItem={({item}) =>  
        <WalletSubscriptionItem onPress={this.onPress} title={item.title}/>}
        keyExtractor={item => item.uuid}
      />
         //<WalletSubscriptionItem onPress={this.onPress} title={this.state.data}/>
      )
   }
   
   onPress () {
    console.log('Text clicked');
  }
}
export default WalletSubscriptionScreen
