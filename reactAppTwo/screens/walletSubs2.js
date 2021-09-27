import React, { Component } from 'react'
import { View, Text } from 'react-native'
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
            data: responseJson[0].title
         })
         console.log(responseJson);
      })
      .catch((error) => {
         console.error(error);
      });
   }
   render() {
      return (
        // <View>
        //    <Text>
         //      {this.state.data}
        //    </Text>
       //  </View>
         <WalletSubscriptionItem onPress={this.onPress} title={this.state.data}/>
      )
   }
   
   onPress () {
    console.log('Text clicked');
  }
}
export default WalletSubscriptionScreen
