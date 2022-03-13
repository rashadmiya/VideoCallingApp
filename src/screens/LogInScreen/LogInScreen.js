import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Voximplant } from 'react-native-voximplant';
import { APP_NAME, ACC_NAME } from '../../Constant/Constant';
import { useNavigation } from '@react-navigation/native';



const LogInScreen = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('')


    const navigation = useNavigation();
    const voximplant = Voximplant.getInstance();

    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState();
            console.log('status: ', status);
            setLoginStatus(status);
            try {
                if (status == Voximplant.ClientState.DISCONNECTED) {
                    console.log('do enter if section ?')

                    await Voximplant.getInstance().connect();
                } else if (status == Voximplant.ClientState.LOGGED_IN){
                    redirectHome();
                }
            } catch (err) {
                console.log('catch error:', err);
            }

        };
        connect();
    }, []);

    const redirectHome = () => {
        navigation.navigate('Contacts');
    }
    const SignIn = async () => {
        const fQname = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;

        try {
            await voximplant.login(fQname, password)

            redirectHome();
        } catch (e) {
            console.log('catch error in signIn: ', e.name, `error code: ${e.code}`);
            Alert.alert(e.name, `error code : ${e.code}`);
        }
    }


    return (
        <View style={Styles.container}>
            <TextInput value={username} onChangeText={setUserName} placeholder='User Name' style={Styles.textInput} />
            <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Password' style={Styles.textInput} />
            <Pressable onPress={SignIn} style={Styles.button}>
                <Text style={Styles.buttonText}>SignIn</Text>
            </Pressable>
            <View style={Styles.loginStatus}>
                <Text style={{color:'white',padding:5}}>{loginStatus}</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "stretch",
        padding: 20
    },
    textInput: {
        backgroundColor: '#ebebeb',
        paddingVertical: 0,
        marginVertical: 7,
        // width: '70%',
        borderWidth: 1,
        borderColor: 'grey'
    },
    button: {
        marginTop: 30,
        backgroundColor: 'green',
        // width: '40%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        padding: 5,
        fontSize: 18
    },
    loginStatus:{
        position:'absolute',
        top:2,
        right:5,
        backgroundColor:'indianred',
        borderRadius:10
    }
})

export default LogInScreen;


