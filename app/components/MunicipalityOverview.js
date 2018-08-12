import React, { Component } from 'react';
import { Button, Container, H1, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class MunicipalityOverview extends Component {
    render() {
        const { marker } = this.props; 
        return(
            <Container style = { styles.container } >
                <View style = { styles.innerContainer } >
                    <H1 style = { styles.heading }> { marker.name.toUpperCase() } </H1>
                    <View style = { styles.grid } >
                        <Text style = { styles.label }> Land Area: </Text> 
                        <Text> { marker.area } </Text>
                    </View>
                    <View style = { styles.grid } >
                        <Text style = { styles.label }> Population:  </Text> 
                        <Text> { marker.population } </Text>
                    </View>
                    <View style = { styles.grid } >
                        <Text style = { styles.label }> Population Density: </Text>
                        <Text> { marker.population_density } </Text>
                    </View>
                    <View style = { styles.buttonContainer } >
                        <Button 
                            primary
                            onPress = { () => this.props.goToDetails() }
                        > 
                            <Text style = { styles.learnMoreButton } > Learn More </Text> 
                        </Button>
                    </View>
                </View> 
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    }, 
    innerContainer: {
        borderStyle: 'solid',
        borderTopWidth: 7,
        borderTopColor: '#3588ba',
        width: '80%',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
    },
    heading: {
        textAlign: 'center',
        fontWeight: "700", 
    },
    label: {
        fontWeight: "700",
        marginLeft: 10
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    learnMoreButton: {
        fontWeight: "700",
        fontSize: 18
    }
})