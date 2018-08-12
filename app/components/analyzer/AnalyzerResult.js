import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Card, CardItem, Body, Text } from 'native-base'
import material from '../../../native-base-theme/variables/material'

export default class AnalyzerResult extends Component {
  constructor( props ) {
    super( props )
  }

  renderMessages( messages ) {
    let messagesArray = [];
    
    messages.forEach( ( message,index ) => {
        messagesArray.push( 
            <View key={ index } style={ { display: 'flex', flexDirection: 'row', borderTopColor: material.brandPrimary, borderStyle: 'solid', borderTopWidth: 1, paddingTop: 10, marginRight: 10, width: '100%' }} > 
                <Icon name="arrow-right" color={  message.alertType == 'success' ? material.brandSuccess : material.brandDanger } style={ {paddingTop: 5, paddingRight: 5 }}/> 
                <Text> { message.message } </Text>
            </View>
        );
    })

    return messagesArray;   
  }

  render() {
    const { notifications } = this.props;
    console.log( 'This is the notification: ', notifications );
    let notificationDisplay = null;

    let displayNotifications = () => {
      return (
        <CardItem>
          <Body>
            { notifications.name && 
              <Text style={ styles.label }> { notifications.name.toUpperCase() }: </Text>
            }
              { this.renderMessages( notifications.messages ) }
          </Body>
        </CardItem>
      )
    }

    let displayEmptyNotifications = () => {
      return (
        <CardItem>
          <Body>
            <Text style={ { textAlign: 'center'} }> No trends to show at this moment. Keep checking regularly. </Text>
          </Body>
        </CardItem>
      )
    }

    if( notifications.messages.length > 0 ) {
      notificationDisplay = displayNotifications()
    }else {
      if( this.props.displayEmptyMessage ) {
        notificationDisplay = displayEmptyNotifications()
      }
    }

    return (notificationDisplay);
  }
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "700",
    color: material.brandPrimary
  },
})