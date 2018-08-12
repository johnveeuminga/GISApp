import React, { Component } from 'react'
import { Container, Content, H1, Card, CardItem, Body, Text } from 'native-base'
import { StyleSheet, View } from 'react-native'
import material from '../../../native-base-theme/variables/material'
import Icon from 'react-native-vector-icons/FontAwesome'
import AnalyzerResult from '../../components/analyzer/AnalyzerResult'
import analyzerConfig from '../../../analyzerconfig'
import Analyzer from '../../libs/Analyzer'

export default class LakeInfo extends Component {
  constructor( props ) {
    super(props)
  }

  analyzeRiver() {
    let analyzer = new Analyzer( analyzerConfig );

    let res = analyzer.analyzeData( { ...this.props.navigation.getParam( 'lakeInfo', null )}, 'lakeAnalyzer' );

    if( res && res.length > 0 ) {
      return (this.renderNotifications( { messages: res } ));
    }

    return false;
  }

  renderNotifications( notifications, displayEmpty = false ) {
    return(
      <AnalyzerResult 
        notifications = {notifications}
        displayEmpty = {true}
      />
    )
  }

  static navigationOptions = () => {
    return({
        title: 'Lake Information'
      }
    )
  }
  render() {
    const lakeInfo = this.props.navigation.getParam( 'lakeInfo', null );

    return(
      <Container>
        <Content padder>
          <Card>
            <CardItem header style={ styles.cardHeader }>
              <Text> {'General Information'.toUpperCase() }</Text>
            </CardItem>
  
            <CardItem>
              <Body>
                <View style={{ marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                  <Text style = { styles.label }>Max Length: </Text>
                  <Text> { lakeInfo.max_length } km </Text>
                </View>
                <View style={{ marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                  <Text style = { styles.label }>Max Width: </Text>
                  <Text> { lakeInfo.max_width } km </Text>
                </View>
                <View style={{ marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                  <Text style = { styles.label }>Surface Area: </Text>
                  <Text> { lakeInfo.surface_area } km</Text>
                </View>
                <View style={{ marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                  <Text style = { styles.label }>Surface Elevation: </Text>
                  <Text> { lakeInfo.surface_elevation } m</Text>
                </View>
                <View style={{ marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                  <Text style = { styles.label }>Depth: </Text>
                  <Text> { lakeInfo.average_depth } m</Text>
                </View>
                <View style={{ marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                  <Text style = { styles.label }>Depth: </Text>
                  <Text> { lakeInfo.average_depth } m</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem footer >
            </CardItem>
          </Card>
          <Card>
            <CardItem header style={ styles.cardHeader }>
              <Text> TRENDS: </Text>
            </CardItem>
            <CardItem>
              <Body style ={ {marginLeft: -15, marginRight: -15} }>
                { this.analyzeRiver() }
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  cardHeader: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: material.brandPrimary
  },
  label: {
    fontWeight: "700",
    color: material.brandPrimary
  },
})

