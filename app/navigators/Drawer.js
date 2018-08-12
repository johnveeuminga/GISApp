import { createDrawerNavigator } from 'react-navigation'
import Home from '../components/Home';
import Sidebar from '../components/Sidebar'
import MainStack from './MainStack'

let _drawer;

const setDrawerRef = ( drawerRef ) => {
  _drawer = drawerRef;
}

const openDrawer = () => {
  if( _drawer ) {
    _drawer.openDrawer();
  }
}

const navigate = ( route, props ) => {
  if( _drawer ) {
    _drawer.navigate( route, props );
  }
}

const closeDrawer = () => {
  if( _drawer ) {
    _drawer.closeDrawer();
  }
}

const RootStack =  createDrawerNavigator({
  MainStack: {
      screen: MainStack
  }},
  {
    contentComponent: Sidebar,
    drawerWidth: 300,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

export {
  setDrawerRef,
  RootStack,
  openDrawer,
  closeDrawer,
  navigate
}
