import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'
import material from '../../../native-base-theme/variables/material'
import titleCase from 'title-case'
import analyzerConfig from '../../../analyzerconfig';
import Analyzer from '../../libs/Analyzer'
import AnalyzerResult from '../analyzer/AnalyzerResult'

export default class Plants extends Component {
  analyzer;

  constructor( props ) {
    super( props )
  }

  static navigationOptions = () => {
    return {
      title: 'Plants & Vegetation'
    }
  }

  analyzePopulation( data ) {
    let analyzer = new Analyzer( analyzerConfig );
    let res = analyzer.analyzeData( data, 'plantAnalyzer', 'population' );

    if( res && res.length > 0 ) {
      return (this.renderNotifications( { messages: res } ));
    }

    return false;
  }

  renderNotifications( notifications, displayEmpty = false ) {
    return(
      <AnalyzerResult 
        notifications = {notifications}
      />
    )
  }

  render() {
    const plants = this.props.navigation.getParam( 'plants', null )
    return (
      <Container>
        <Content padder>
          { plants.map( (plant,index) => (
            <Card key={index}>
              <CardItem header style={ styles.cardHeader }>
                <Text> { titleCase(plant.name) } </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    <Text style={ styles.label }> Population: </Text>
                    { plant.population }
                  </Text>
                </Body>
              </CardItem>
              { this.analyzePopulation( plant ) }
              <CardItem footer>
              </CardItem>
            </Card>
          ))}
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