import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Text } from 'native-base';
// import testData from '../testdata';
import MunicipalityOverview from './MunicipalityOverview';
import Icon  from 'react-native-vector-icons/FontAwesome'
import { openDrawer, closeDrawer } from '../navigators/Drawer';
import { municipalities } from '../libs/Municipality';

type Props = {};
class Home extends Component<Props> {
  constructor(props) {
    super( props );
    this.state = { selectedMarker: null }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon.Button 
          name="bars" 
          color="#fff" 
          solid 
          backgroundColor="transparent" 
          iconStyle = {{ marginLeft: 10, marginRight: 20 }}
          onPress = { () => { openDrawer() } }
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView 
          style={ styles.map } 
          initialRegion={{
            latitude: 17.523212956350974,
            longitude: 120.658914539963,
            latitudeDelta: 0.4406549876980286,
            longitudeDelta: 0.24903606623411179,
          }}
          onRegionChangeComplete = { region => { console.log( region ) }}
          onPress = { res => this.handleMapOnPress() }
        >
          {
            municipalities.map( (municipality) => (
              <Marker
                coordinate={{ latitude:  parseFloat(municipality.latitude), longitude: parseFloat(municipality.longitude) }}
                key = { municipality.id }
                onPress = { () => this.selectedMarkerHandler( municipality ) }
              />
            ) )
          }
        </MapView>
        { this.state.selectedMarker && this.renderMunicipalityOverview() }
      </View>
    );
  }
  selectedMarkerHandler( marker ) {
    this.setState( () => {
      console.log( marker ) 
      return { selectedMarker: marker }
    })
  }

  handleMapOnPress() {
    if( this.state.selectedMarker ) {
      this.setState( () => {
        return { selectedMarker: null }
      })
    }
  }

  renderMunicipalityOverview() {
    marker = this.state.selectedMarker

    return(
      <MunicipalityOverview 
        marker = { marker }
        goToDetails = { () => this.props.navigation.navigate('MunicipalityDetails', {
          municipalityDetails: marker
        }) }
      />
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      position: 'relative'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    map: {
      borderColor: "#000",
      borderStyle: "solid",
      borderWidth: 1,
      flex: 1,
      ...StyleSheet.absoluteFillObject
    }
  });

export default Home;