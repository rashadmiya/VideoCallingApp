import { View, StyleSheet} from 'react-native'
import React from 'react'
import ControlPanel from '../../../conponents/ControlPanel'

const InCallScreen = () => {
  return (
    <View style={Styles.page}>
            <View style={Styles.camaraPriview}>
                <View style={{ height:150,width:100, position: 'absolute', top:50, right:10,backgroundColor:'yellow' }}>
                    
                </View>
               
            </View>

            <ControlPanel/>
        </View>
  )
}
const Styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: '#7b4e80',

    },
    camaraPriview: {
        // backgroundColor: '#7b4e80',
        flex: 1,
        paddingTop: 60,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 22,
        color: 'white'
    },
    phoneNumber: {
        fontSize: 18,
        color: "white",
        marginTop: 10
    },
    
})
export default InCallScreen