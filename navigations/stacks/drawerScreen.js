import { createDrawerNavigator } from 'react-navigation/drawer';
import Screen1 from './../../screens/ChatScreen'
import Screen2 from './../../screens/BookScreen'

const DrawerScreen = createDrawerNavigator({
    Screen1: {screen: Screen1},
    Screen2: {screen: Screen2},
}, {
    headerMode: 'none',
})

export default DrawerScreen;