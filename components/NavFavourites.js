import React from 'react';

import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import tw from "twrnc";
import {useDispatch} from "react-redux";
import {setDestination} from "../slices/navSlice";

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        coords: {lat: -23.44279422829955, lng: -46.52444681884378},
        destination: 'Rua Joao Artoni Testae'
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Casa Amanda',
        coords: {lat: -23.43116034660059, lng: -46.50586785782914},
        destination: 'Rua Trajano de Faria'
    }
]


const NavFavourites = () => {

    const dispatch = useDispatch();

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View
                    style={[
                        tw`bg-gray-200`,
                        {height: 0.5}
                    ]}
                />
            )}
            renderItem={({item: {location, destination, icon, coords}}) => (
                <TouchableOpacity
                    style={tw`flex-row items-center p-5`}
                    onPress={() => {
                        dispatch(
                            setDestination({
                                location: coords,
                                description: destination
                            })
                        )
                    }}
                >
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type={"ionicon"}
                        color={"white"}
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavFavourites;
