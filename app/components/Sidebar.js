import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, FlatList } from 'react-native'
import { Button } from 'native-base'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import testData from '../testdata'
import { municipalities } from '../libs/Municipality'
import { closeDrawer } from '../navigators/Drawer'
import StackNavigator from '../navigators/StackNavigator'
import material from '../../native-base-theme/variables/material'

export default class Sidebar extends Component {
  renderSidebarItem = ({item}) => {
    return(
      <Button 
        id={ item.id } 
        style={ styles.listItem } 
        onPress = { () => this.navigateToDetails( item ) }
        transparent 
        block
      >
        <Text style={ styles.listItemText }>{ item.name }</Text>
        <Icon name='chevron-right' color={ material.brandPrimary } />
      </Button>
    )
  }

  navigateToDetails( item ) {
    closeDrawer()
    StackNavigator.navigate( 'MunicipalityDetails', { municipalityDetails: item } )
  }

  seperatorComponent = () => (
    <View style={ styles.separator }> 
    </View>
  )

  keyExtractor = ( item ) => { return item.id.toString() };

  render() {
    return(
      <ScrollView>
        <SafeAreaView style = { styles.container }>
          <View style ={ styles.imageContainer }>
            <Image source={ require('../assets/logo.jpg') } style= { {flex: 1, height: 200, width: undefined } } resizeMode="cover" />
          </View>
          <View>
            <FlatList 
              data={ municipalities }
              renderItem = { this.renderSidebarItem }
              keyExtractor = { this.keyExtractor }
              style = { { flex: 1 } }
              ItemSeparatorComponent = { this.seperatorComponent }
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    color: "#000",
    fontSize: 14,
  },
  separator: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#ddd'
  },
  imageContainer: { 
    flex: 1, 
    width: '100%', 
    flexDirection: 'row', 
    marginBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: material.brandPrimary,
    borderStyle: 'solid'
  }
})