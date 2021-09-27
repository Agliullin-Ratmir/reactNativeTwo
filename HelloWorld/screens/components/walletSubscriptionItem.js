import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

export default class WalletSubscriptionItem extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <TouchableOpacity onPress={this.props.onPress}>
      <View>
      <div>
      <div align="left"><Text>{this.props.title}</Text></div>
      <div align="right"><Text>{this.props.title}</Text></div>
      </div>
      </View>
      </TouchableOpacity>
    );
  }
}
