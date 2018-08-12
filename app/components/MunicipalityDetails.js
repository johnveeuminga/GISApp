import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native' 
import { Container, H1, Text, H3, Card, CardItem, Body, Content, Button } from 'native-base'
import material from '../../native-base-theme/variables/material';
import * as axios from 'axios'
import Analyzer from '../libs/Analyzer';
import analyzerConfig from '../../analyzerconfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay'

export default class MunicipalityDetails extends Component {

    WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    analyzer = null;

    constructor( props ) {
        super( props )
        const{ navigation } = this.props
        this.analyzer = new Analyzer( analyzerConfig );
        this.state = { 
            municipalityDetails: navigation.getParam('municipalityDetails', null),
            fetching: false ,
            weatherData: null,
            notifications: []
        } 

    }

    static navigationOptions  = ( { navigation } ) => {
        return {
          title: navigation.getParam('municipalityDetails', null).name
        }
    }

    componentDidMount() {
        if( this.props.navigation.getParam('municipalityDetails').weather_id ) {
            this.getWeatherDetails()
        }

        this.getNotifications()
    }

    render() {
        const municipalityDetails = this.state.municipalityDetails;
        return (
            <Container style={ styles.container }>                          
                <Spinner
                    visible = { this.state.fetching }
                    overlayColor = {material.brandPrimary}
                    textContent = "Setting up data"
                    textStyle = { {color: '#fff', fontSize: 12} }
                />
                <Content padded>
                    <H1 style={ styles.title }> { municipalityDetails.name.toUpperCase() } </H1>
                    <Card >
                      <CardItem header style={styles.cardHeader}>
                          <Text > DESCRIPTION: </Text>   
                      </CardItem>
                      <CardItem>
                          <Body>
                              <Text> { municipalityDetails.description } </Text>
                          </Body>
                      </CardItem>
                      <CardItem>
                        <Body>
                          { this.state.municipalityDetails.lake &&
                             <Button 
                              block 
                              primary 
                              style={ styles.linkButton }
                              onPress = { () => this.props.navigation.navigate('LakeInfo', { lakeInfo: this.state.municipalityDetails.lake })
                              }
                            >
                              <Text> Lake Info </Text>
                           </Button>
                          }

                          { this.state.municipalityDetails.demography &&
                            <Button 
                              block 
                              primary 
                              style={ styles.linkButton }
                              onPress = { () => this.props.navigation.navigate( 'Demogprahy', { animals: this.state.municipalityDetails.demography }) }
                            >
                              <Text> Demography </Text>
                            </Button>}

                          { (this.state.municipalityDetails.animals && this.state.municipalityDetails.animals.length > 0 ) && 
                            <Button 
                              block 
                              primary 
                              style={ styles.linkButton }
                              onPress = { () => this.props.navigation.navigate( 'Animals', { animals: this.state.municipalityDetails.animals }) }
                            >
                              <Text> Fauna </Text>
                            </Button> }

                          { ( this.state.municipalityDetails.plants && this.state.municipalityDetails.plants.length > 0) &&             
                            <Button 
                              block 
                              primary 
                              style={ styles.linkButton }
                              onPress = { () => this.props.navigation.navigate( 'Plants', { plants: this.state.municipalityDetails.plants }) }
                            >
                              <Text> Flora </Text>
                            </Button> }
                        </Body>
                      </CardItem>
                    </Card>
                    { this.state.weatherData && this.renderWeatherDetails() }
                    { this.state.notifications && this.renderNotifications() }
                </Content>
            </Container>
        )
    }

    renderWeatherDetails() {
        const { weatherData } = this.state;
        return(
            <Card>
                <CardItem header style={styles.cardHeader}>
                    <Text > WEATHER OVERVIEW: </Text>   
                </CardItem>
                <CardItem>
                    <Body>
                        <Text> 
                            <Text style={ styles.label }> Weather: </Text> 
                            { weatherData.weather[0].description } 
                        </Text>
                        <Text> 
                            <Text style={ styles.label }> Temperature: </Text> 
                            { weatherData.main.temp} Farenheit 
                        </Text>
                        <Text>
                            <Text style={ styles.label }> Humidity: </Text> 
                            { weatherData.main.humidity}% 
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                </CardItem>             
            </Card>
        )
    }

    renderNotifications() {
        const { notifications } = this.state;
        let notificationDisplay = null;

        let displayNotifications = () => {
          return (
            notifications.map( ( notification, index ) => {
              return (
                <CardItem key={index}>
                  <Body>
                      <Text style={ styles.label }> { notification.name.toUpperCase() }: </Text>
                      { this.renderMessages( notification.messages ) }
                  </Body>
                </CardItem>
              )
            } )
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

        if( notifications.length > 0 ) {
          notificationDisplay = displayNotifications()
        }else {
          notificationDisplay = displayEmptyNotifications()
        }

        return (
          <Card >
              <CardItem header style={styles.cardHeader}>
                  <Text > TRENDS: </Text>
              </CardItem>
              { notificationDisplay }
              <CardItem footer>
              </CardItem>
          </Card>
        );
    }

    renderMessages( messages ) {
        let messagesArray = [];
        
        messages.forEach( ( message,index ) => {
            messagesArray.push( 
                <View key={ index } style={ { display: 'flex', flexDirection: 'row' }} > 
                    <Icon name="arrow-right" color={  message.alertType == 'success' ? material.brandSuccess : material.brandDanger } style={ {paddingTop: 5, paddingRight: 5 }}/> 
                    <Text> { message.message } </Text>
                </View>
            );
        })

        return messagesArray;   
    }

    async getWeatherDetails() {
        this.toggleLoading();

        try {

            let res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    id: this.state.municipalityDetails.weather_id,
                    appid: "14a8b71a0744e70a370bdb812b6803e3"
                }
            });

            if( res.data ) {
                this.setState( () => {
                    return { weatherData: res.data }
                })
            }
        } catch( error ) {
            console.log( error )

        }

        this.toggleLoading();
    }

    getNotifications() {
        let notificationsArray = []
        this.state.municipalityDetails.animals.forEach( data => {
            let result = this.analyzer.analyzeData( data, 'population', 'population' );
            
            if( result && result.length > 0 ) {
              notificationsArray.push( { name: data.name, messages: result } );
            }
        })

        this.state.municipalityDetails.plants.forEach( data => {
            let result = this.analyzer.analyzeData( data, 'plantAnalyzer' );
            
            if( result && result.length > 0 ) {
              notificationsArray.push( { name: data.name, messages: result } );
            }
        })

        let lakeResult = this.analyzer.analyzeData( this.state.municipalityDetails.lake, 'lakeAnalyzer' )
        if( lakeResult && lakeResult.length > 0 ) {
            let lakeMessage = { name: 'Lake', messages: [] }
            lakeResult.splice(0, 2 ).map( (message) => {
                lakeMessage.messages.push( message );
            })

            notificationsArray.push( lakeMessage )
        }

        if( notificationsArray ) {
          this.setState( () => {
            return { notifications: notificationsArray }
          })
        }
    }

    toggleLoading() {
        this.setState( previousState => {
            return { fetching: !previousState.fetching }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
    },
    title: {
        textAlign: "center",
        fontWeight: "700",
        marginBottom: 15,
        color: material.brandPrimary
    },
    label: {
      fontWeight: "700",
      color: material.brandPrimary
    },
    alertDanger: {
      color: material.brandDanger,
    },
    alertSuccess: {
      color: material.brandSuccess
    },
    cardHeader: {
      borderBottomWidth: 2,
      borderStyle: 'solid',
      borderBottomColor: material.brandPrimary
    },
    linkButton: {
      marginBottom: 5,
    }

})
