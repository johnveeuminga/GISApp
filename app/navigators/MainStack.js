import React, { Component } from 'React';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/Home'
import LakeInfo from '../components/municipality/LakeInfo'
import AnimalInfo from '../components/municipality/Animals'
import PlantInfo from '../components/municipality/Plants'
import MunicipalityDetails from '../components/MunicipalityDetails'
import material from '../../native-base-theme/variables/material'
import { setDrawerRef } from './Drawer'
import StackNavigator from './StackNavigator'

export default class MainStack extends Component {
  constructor( props ) {
    super(props);

    setDrawerRef( this.props.navigation );
  }

  render() {
    return (
      <MainStackRoutes 
        ref={ ref => {
          StackNavigator.setTopLevelNavigator( ref )
        }} 
      />
    )
  }
}

const MainStackRoutes = createStackNavigator({
  Home: {
    screen: Home
  },
  MunicipalityDetails: {
    screen: MunicipalityDetails
  },
  LakeInfo: {
    screen: LakeInfo
  },
  Animals: {
    screen: AnimalInfo
  },
  Plants: {
    screen: PlantInfo
  }
}, {
  initialRouteName: 'Home',
  navigationOptions:{
    headerStyle:{
      backgroundColor: material.brandPrimary
    },
    headerTitleStyle: {
      color: '#fff',
      fontWeight: 'bold',
    }
  }
})