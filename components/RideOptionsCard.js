import React from 'react';

import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useSelector} from "react-redux";
import {selectDestination, selectOrigin} from "../slices/navSlice";
import tw from "twrnc";

const RideOptionsCard = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        <SafeAreaView style={tw`m-5`}>
            <Text style={tw`text-center pt-5 pb-10`}>
                {origin.description}
            </Text>
            <Text style={tw`text-center`}>
                {destination.description}
            </Text>
        </SafeAreaView>
    );
};

export default RideOptionsCard;
