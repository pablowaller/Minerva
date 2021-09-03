import React from 'react';
import { Text, View, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Register extends React.Component {

    render() {

        return (
            <View style={{ backgroundColor: "#FFF", height: "100%" }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 50,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 2
                }}>
                    <FontAwesome name='user-o' style={{ marginRight: '1.5%' }} size={16} />
                    <TextInput
                        placeholder="Nombre de Usuario"
                        placeholderTextColor="#00716F"
                        style={{ paddingHorizontal: 10 }}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 50,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 2
                }}>
                    <Icon name="mail" color="#00716F" size={24} />
                    <TextInput placeholder="Email" placeholderTextColor="#00716F" style={{ paddingHorizontal: 10 }}/>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 2
                }}>
                    <FontAwesome name='lock' style={{ marginRight: '1.5%' }} size={16} />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#00716F"
                        style={{ paddingHorizontal: 10 }}
                    />
           </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 2
                }}>
                    <FontAwesome name='lock' style={{ marginRight: '1.5%' }} size={16} />
                    <TextInput
                        secureTextEntry
                        placeholder="Confirm Password"
                        placeholderTextColor="#00716F"
                        style={{ paddingHorizontal: 10 }}
                    />
                </View>

                <View style={{
                    marginHorizontal: 55,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                    backgroundColor: "#00716F",
                    paddingVertical: 10,
                    borderRadius: 23
                }}>
                    <Text style={{
                        color: "white",
                        fontFamily: "SemiBold"
                    }}>REGISTRARSE</Text>
                </View>

            </View>
        )
    }
}