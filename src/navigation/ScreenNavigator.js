import React from 'react'
import { View } from 'react-native'
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InCallScreen from '../screens/InCallScreen/InCallScreen';
import ContactsScreen from '../screens/ContactScreen/index';
import CallingScreen from '../screens/CallingScreen/callingScreen';
import IncomingCalling from './../screens/IncomingCallScreen/IncomingCalling';
import LogInScreen from '../screens/LogInScreen/LogInScreen';


const Stack = createNativeStackNavigator();

const navigatorOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
}

const ScreenNavigator = () => {
  return (
    // <View style={{flex:1,backgroundColor:'#000',backfaceVisibility:'hidden'}}>
      <NavigationContainer>
        <Stack.Navigator   initialRouteName='LogIn'>
          <Stack.Screen name='LogIn' component={LogInScreen}/>
          <Stack.Screen name='Contacts' component={ContactsScreen} />

          <Stack.Group screenOptions={{headerShown:false}}>
              <Stack.Screen name='InCalling' component={InCallScreen} />
              <Stack.Screen name='Calling' component={CallingScreen}/>
              <Stack.Screen name='IncomingCall' component={IncomingCalling}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    // </View>
  )
}

export default ScreenNavigator