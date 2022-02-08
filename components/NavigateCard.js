import React from 'react';

import {Text, View, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_API_KEY} from "@env";
import tw from "twrnc";
import {useDispatch} from "react-redux";
import {setDestination} from "../slices/navSlice";
import {useNavigation} from "@react-navigation/native";
import NavFavourites from "./NavFavourites";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <Text style={tw`text-center py-5 text-xl`}>
                        Hello, Leonardo
                    </Text>
                    <View>
                        <View>
                            <GooglePlacesAutocomplete
                                placeholder='Where To?'
                                styles={toInputBoxStyles}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                debounce={400}
                                minLength={2}
                                enablePoweredByContainer={false}
                                fetchDetails={true}
                                returnKeyType={"search"}
                                query={{
                                    key: GOOGLE_MAPS_API_KEY,
                                    language: 'en',
                                }}
                                onPress={(data, details = null) => {
                                    dispatch(
                                        setDestination({
                                            location: details.geometry.location,
                                            description: data.description
                                        })
                                    );
                                    navigation.navigate('RideOptionsCard');
                                }}
                            />
                        </View>
                        <NavFavourites/>
                    </View>
                </>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})