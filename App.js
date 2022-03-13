import { Text, View, SafeAreaView,StatusBar} from 'react-native'
import React, { Component } from 'react'

import ScreenNavigator from './src/navigation/ScreenNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallingScreen from './src/screens/CallingScreen/callingScreen';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:'black'}}>
        {/* <StatusBar barStyle='light-content'/> */}

          {/* <ContactsScreen/> */}
          {/* <CallingScreen/> */}
          {/* <IncomingCalling/> */}

          <ScreenNavigator/>

         {/* <NavigationContainer>
           <Stack.Navigator >
             <Stack.Screen component={CallingScreen} name="calling"/>
           </Stack.Navigator>
         </NavigationContainer> */}

      </View>
    )
  }
}