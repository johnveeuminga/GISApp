import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';

class CustomMapView extends React.Component {
    render() {
        console.log( this.props.style )

        return (
            <MapView
                style={ this.props.style }
                region={ this.props.region }
            >
            </MapView>
        )
    }
}

const MapView = requireNativeComponent( 'CustomMap', false );

export default CustomMapView;