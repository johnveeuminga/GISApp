import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'
import material from '../../../native-base-theme/variables/material'
import titleCase from 'title-case'
import analyzerConfig from '../../../analyzerconfig'
import Analyzer from '../../libs/Analyzer'
import AnalyzerResult from '../../components/analyzer/AnalyzerResult'

export default class Animals extends Component {

  constructor( props ){
    super( props );

  }

  static navigationOptions = () => {
    return ({
      title: 'Animal Info'
    })
  }

  analyzePopulation( data ) {
    let analyzer = new Analyzer( analyzerConfig );
    console.log( analyzer )
    let res = analyzer.analyzeData( data, 'population', 'population' );

    if( res && res.length > 0 ) {
      console.log( res );
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
    const animals = this.props.navigation.getParam( 'animals', null );
    return(
      <Container>
        <Content padder>
          { animals.map( (animal, index) => (
            <Card key={ index }>
              <CardItem header style={ styles.cardHeader }>
                <Text> { titleCase(animal.name) } </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>
                      <Text style={ styles.label }> Population: </Text>
                      { animal.data.population }
                    </Text>
                  </View>
                </Body>
              </CardItem>
              { this.analyzePopulation( animal ) }
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