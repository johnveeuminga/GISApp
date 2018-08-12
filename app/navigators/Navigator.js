import { NavigationActions } from 'react-navigation';

let _drawer;

function setTopLevelNavigator( navigatorRef ) {
    _drawer = navigatorRef;
    console.log( _drawer );
}

function openDrawer() {
    console.log( _drawer );
}

export default {
    openDrawer,
    setTopLevelNavigator
}