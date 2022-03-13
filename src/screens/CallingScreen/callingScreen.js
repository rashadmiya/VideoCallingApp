import React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet,Alert, PermissionsAndroid, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ControlPanel from './../../../conponents/ControlPanel';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';


Icon.loadFont();

const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA
];
const CallingScreen = () => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [callingStatus, setCallingStatus] = useState('initializing');
    const [localVideoStreamId, setLocalVideoStreamId] = useState('');
    const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');


    const Navigation = useNavigation();
    const Route = useRoute();
    const {user, call:incomingCall, isIncomingCall} = Route?.params;
    // console.log(User)
    const voximplnt = Voximplant.getInstance();
    const call = useRef(incomingCall);
    const endpoint = useRef(null);
    useEffect(() =>{
        const getPermission = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] == 'granted';
            const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] == 'granted';


            if(!cameraGranted && !recordAudioGranted){
                Alert.alert('Permission not granted');
            } else{
                setPermissionGranted(true);
            }
        };
        if(Platform.OS == 'android'){
            getPermission();
        } else{
            setPermissionGranted(true);
        }
    },[]);

    useEffect(() =>{
        
        if(!permissionGranted){
            return;
        }

        const callSettings = {
            video:{
                sendVideo : true,
                receiveVideo : true
            },
        };
        
        const makeCall = async () =>{
            try {
                call.current = await voximplnt.call(user.user_name, callSettings);
                subscribeToCallEvents();
            }catch (err) {
                console.log('make call catch error :',err);
            }
        };
        const answerCall = () =>{
            subscribeToCallEvents();
            endpoint.current = call.current.getEndpoints()[0];
            subscribeToEndpointEvent();
            call.current.answer(callSettings);
        }
        const subscribeToCallEvents = () => {
            call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
                ShowError(callEvent.reason);
            });
            call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
                setCallingStatus('Calling...');
            });
            call.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
                setCallingStatus('Connected');
            });
            call.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
                Navigation.navigate('Contacts');
                setCallingStatus('Disconnected');
            });
            call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, (callEvent) => {
                setLocalVideoStreamId(callEvent.videoStream.id);
            });
            call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
                endpoint.current = callEvent.endpoint;
                subscribeToEndpointEvent();
            });
        };

        const subscribeToEndpointEvent = async () =>{
            endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded, endpointEvent => {
                setRemoteVideoStreamId(endpointEvent.videoStream.id);
            });
        }
        const ShowError = (failReason) => {
            Alert.alert('Call Failed', `Reason : ${failReason}`,[{
                text:'ok',
                onPress: Navigation.navigate('Contacts'),
            }],
            );
        }
        if (incomingCall){
            answerCall();
        }else{
            makeCall();
        }
        // unsubscribed
        return () => {
            call.current.off(Voximplant.CallEvents.Failed);
            call.current.off(Voximplant.CallEvents.ProgressToneStart);
            call.current.off(Voximplant.CallEvents.Connected);
            call.current.off(Voximplant.CallEvents.Disconnected);
            // call.current.off(Voximplant.CallEvents.LocalVideoStreamAdded);
            // call.current.off(Voximplant.CallEvents.EndpointAdded)
        };
    },[permissionGranted])

    const OnHangUp = () => {
        console.log('onHangUp taggle fron calling screen');
        // call.current.hangUp();
        Navigation.goBack()
    }

    return (
        <View style={Styles.page}>
            <Icon onPress={() => Navigation.goBack()} name='chevron-back' size={40}  color='black'
            style={{backgroundColor:'transparent',position:'absolute',top:0,left:10}}/>
           

            <View style={Styles.camaraPriview}>

            <Voximplant.VideoView
                videoStreamId={remoteVideoStreamId}
                style={Styles.remoteVideo}
                /> 
            <Voximplant.VideoView
                videoStreamId={localVideoStreamId}
                style={Styles.localVideo}
                />

            
                <View style={{ alignItems: "center" }}>
                    <Text style={Styles.name}>{user.user_display_name} ❤</Text>
                    <Text style={Styles.phoneNumber}>{callingStatus}</Text>
                </View>
               <ControlPanel OnHangUp = {OnHangUp}/>
            </View>

            
        </View>
    );
};

const Styles = StyleSheet.create({
    page: {
        height: '100%'
    },
    camaraPriview: {
        backgroundColor: '#7b4e80',
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
    localVideo:{
        backgroundColor: '#ffff6e',
        borderRadius:10,
        position:'absolute',
        right:10,
        top:10,
        width:100,
        height:150,
    },
    remoteVideo:{
        backgroundColor: '#7b4e80',
        borderRadius:10,
        position:'absolute',
        right:0,
        left:0,
        top:0,
        bottom:100
    }
})

export default CallingScreen;