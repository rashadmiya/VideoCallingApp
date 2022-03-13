import { View, Text, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import React,{useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImage from '../../../assets/VideoCallAssets/images/ios_bg.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';


const IncomingCalling = () => {
    const [caller, setCaller] = useState('');
    const route = useRoute();
    const {call} = route.params;
    const Navigation = useNavigation();

    const onDecline = () => {
        call.decline();
        console.log('onDecline pressed');
    }

    const onAccept = () => {
        Navigation.navigate('Calling', {
            call,
            isIncomingCall: true,
        })
        console.log('onAccept is pressed');
    }
    useEffect(() => {
        setCaller(call.getEndpoints()[0].displayName)
        call.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
            Navigation.navigate('Contacts');
        });

        // unsubscribe
        return () => {
            call.off(Voximplant.CallEvents.Disconnected);
        }
    },[])

    return (
        <ImageBackground source={bgImage} resizeMode="cover" style={Styles.BgContainer}>
            <View style={Styles.camaraPriview}>
                <View style={{ alignItems: "center" }}>
                    <Text style={Styles.name}>Rashad ❤</Text>
                    <Text style={Styles.phoneNumber}> <Icon name='logo-whatsapp' size={25} color='#647bff'/> WhatsApp Video</Text>
                </View>

            <View style={{marginTop:'auto', alignSelf:'center'}}>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{alignItems:'center'}}>
                    <Icon name='alarm' size={30} color='#fff'/>
                    <Text style={{color:'#fff',paddingHorizontal:20, paddingBottom:30,fontSize:12}}>Remember me</Text>
                </View>

                <View style={{alignItems:'center'}}>
                    <Icon name='mail' size={25} color="#fff"/>
                    <Text style={{color:'#fff',paddingHorizontal:20, paddingBottom:30,fontSize:12}}>Leave a Message</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                
                <Pressable onPress={onDecline} style={{alignItems:'center'}}>
                    <Icon name='close-outline' size={50} color='#fff' style={{backgroundColor:'red', borderRadius:40}}/>
                    <Text style={{color:'#fff'}}>Dicline</Text>
                </Pressable>

                <Pressable onPress={onAccept} style={{alignItems:'center',marginBottom:30}}>
                    <Icon name='checkmark-outline' size={50} color='#fff' style={{backgroundColor:'#2e7bff', borderRadius:40}} />
                    <Text style={{color:'#fff'}}>Accept</Text>
                </Pressable>
            </View>

            </View>
                
            </View>

        </ImageBackground>

    )
}


const Styles = StyleSheet.create({
    camaraPriview:{
        flex:1,
        flexDirection:'column'
    },
    name: {
        fontSize: 22,
        color: 'white',
        marginTop:100,
        marginBottom:15,
    },
    phoneNumber: {
        fontSize: 18,
        color: "white",
        marginTop: 10
    },
    BgContainer: {
    //    flex: 1,
    //    padding:10,
    //    alignItems:'center',
       height:'100%',
       paddingHorizontal:20
    }
})

export default IncomingCalling