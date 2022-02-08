import React, {useEffect} from 'react';
import tw from "twrnc";

import {View, SafeAreaView, Image} from 'react-native';
import NavOptions from "../components/NavOptions";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_API_KEY} from "@env";
import {useDispatch, useSelector} from "react-redux";
import {selectOrigin, setDestination, setOrigin} from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
import {useNavigation} from "@react-navigation/native";


const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigator = useNavigation();
    const origin = useSelector(selectOrigin);

    useEffect(() => {
        if (!origin) return;
        navigator.navigate('MapScreen');
    }, [origin]);


    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    source={{uri: 'https://links.papareact.com/gzs'}}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder='Where From?'
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 14
                        }
                    }}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    minLength={2}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            })
                        );
                        dispatch(setDestination(null));
                    }}
                />

                <NavOptions/>
                <NavFavourites mode={"origin"}/>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
