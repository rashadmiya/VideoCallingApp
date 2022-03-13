

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import dummyContacts from '../../../assets/VideoCallAssets/data/contacts.json';
import { Voximplant } from 'react-native-voximplant';

const ContactsScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(dummyContacts)

    useEffect(() => {
        const newContacts = dummyContacts.filter(contact => contact.user_display_name.toLocaleLowerCase().includes(searchText.toLowerCase()),);
        setFilteredContacts(newContacts);
    }, [searchText])

    const navigation = useNavigation();
    const voximplant = Voximplant.getInstance();

    const callUser = (user) =>{
       navigation.navigate('Calling', {user});
    }

    useEffect(() => {
        voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent =>{
            navigation.navigate('IncomingCall',{call: incomingCallEvent.call});
        });
        
        return () => {
            voximplant.off(Voximplant.ClientEvents.IncomingCall);
        };
    },[]);

    return (
        <View style={Styles.page}>
            <TextInput style={Styles.searchBox} placeholder='Search here' value={searchText} onChangeText={setSearchText} />
            <FlatList
                data={filteredContacts}
                renderItem={({ item }) => (
                    <Pressable onPress={ () => callUser(item)}>
                     <Text style={{ ...Styles.item, color: '#000' }}>{item.user_display_name}</Text>
                     </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={Styles.separetor} />}
            />
            <View style={Styles.separetor} />
        </View>
    );
};

const Styles = StyleSheet.create({
    page: {
        padding: 15,
    },
    item: {
        fontSize: 16,
        marginVertical: 10

    },
    separetor: {
        width: '100%',
        height: 1.4,
        backgroundColor: '#f0f0f0'
    },
    searchBox: {
        backgroundColor: "#ebebeb",
        textAlign: 'center',
        borderRadius: 30,
        height: 35
    }
})

export default ContactsScreen;