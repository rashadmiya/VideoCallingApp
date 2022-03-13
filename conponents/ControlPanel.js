import { View, StyleSheet,Pressable,} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const ControlPanel = (props) => {

const [isCameraOn, setisCameraOn] = useState(true);
const [isMicOn, setIsMicOn] = useState(true);
const [isCallRunning, setIsCallRunning] = useState(true);

    const onReverseCamara = () => {
        setisCameraOn(currentState => !currentState);
        console.log('camera reverse successfull')
    }

    const onToggleShare = () => {
        console.log('onToggleShare taggle');
    }
    const onToggleMicroPhone = () => {
        setIsMicOn(!isMicOn);
        console.log('mic taggle');
    }
    const onHangUp = () => {
        setIsCallRunning(!isCallRunning);
        props.OnHangUp;
    }
  return (
    <View style={Styles.controlBox}>

    <Pressable onPress={onReverseCamara} style={Styles.controlButton}>
        <Icon name={isCameraOn == true ? 'ios-camera-reverse' : 'close-outline'} size={30} color='#fff'/>
    </Pressable>

    <Pressable onPress={onToggleMicroPhone} style={Styles.controlButton}>
        <Icon name={isMicOn == true ? 'ios-mic' :'ios-mic-off'} size={30} color='#fff'/>
    </Pressable>

    <Pressable onPress={onToggleShare} style={Styles.controlButton}>
        <Icon name='ios-share-outline' size={30} color='#fff'/>
    </Pressable>

    <Pressable onPress={onHangUp} style={Styles.controlButton}>
        <Icon name='ios-call-outline' size={30} color={isCallRunning == true ? 'red' : 'green' } 
        style={isCallRunning == true? {transform: [{rotateY: '180deg'}]} : {transform: [{rotateY: '360deg'}]}}/>
    </Pressable>
    
 </View>
  )
}


const Styles = StyleSheet.create({
    controlBox: {
        padding: 4,
        paddingHorizontal:30,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#48494b',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    controlButton: {
        padding:10,
        backgroundColor: '#333333',
        borderRadius: 50,
    }
})

export default ControlPanel