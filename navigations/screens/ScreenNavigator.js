import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './../../screens/HomeScreen'
import DrawerStack from './../stacks/drawerStack';

const Stack = createStackNavigator({
  drawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none',
  initialRouteName: 'drawerStack'
})

const StackNavigator = createAppContainer(Stack)

const ScreenNavigator = () => (
  <StackNavigator>
      <HomeScreen/>
  </StackNavigator>
)
export default ScreenNavigator;

