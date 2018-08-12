/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View } from 'native-base'
import {RootStack} from './app/navigators/Drawer';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';
import NavigationService from './app/navigators/Navigator';
// import testData from './app/testdata';
import { municipalities, getMunicipalities } from './app/libs/Municipality';
import Spinner from 'react-native-loading-spinner-overlay';

type Props = {};
export default class App extends Component<Props> {
  constructor( props ) {
    super( props )

    this.state = { fetching: true }

  }

  async componentDidMount() {
    await getMunicipalities()

    this.setState( () => {
      return { fetching: false }
    })

  }

  displayApp() {
    if( this.state.fetching ) {
      return(
        <View style={ { flex: 1 } }>
          <Spinner
            visible = { true }
            overlayColor = {material.brandPrimary}
            textContent = "Setting up data"
            textStyle = { {color: '#fff', fontSize: 12} }
          />
        </View>
      )
    } else {
      console.log( 'display' )
      return (
        <StyleProvider style={ getTheme( material )} >
          <RootStack />
        </StyleProvider>
      )
    }
  }

  render() {
    return this.displayApp()
  }
}