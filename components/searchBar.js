// Turned into a functional component by Victor Mendez,
// Main structure by Mayank,
// Adapted and modified by Victor Mendez

import { search } from "../api/search";
import { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { Dimensions, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isMobile } from "react-device-detect";
import { View, Image } from "react-native-web";

/**
 * Search bar component
 * @param {boolean} state of the foodTypes component
 * @param {function} function to change the state of the foodTypes component
 * @returns Search bar component
 * * */
const SearchBar = ({ isFoodTypesOpen, openFoodTypes }) => {


  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  return (

    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
    {
        !isFoodTypesOpen ? (
          <Image
            style={tailwind("w-5 h-5 flex-row")}
            resizeMode="contain"
            source={require("../assets/icons/black/search.png")}
          />
        ) : (
          <TouchableOpacity onPress={() => openFoodTypes(false)}>
            <Image
              style={tailwind("w-5 h-5 flex-row")}
              resizeMode="contain"
              source={require("../assets/icons/black/back.png")}
            />
          </TouchableOpacity>
        )
    }

        <TextInput
        placeholder="What would you like to eat?"
        onFocus={() => openFoodTypes(true)}
        style={{
            flexDirection: "row",
            height: 40,
            margin: 12,
            borderLeftWidth: 1,
            padding: 10,
            width: isMobile 
              ? Dimensions.get('window').width * 0.85
              : Dimensions.get('window').width * 0.4,
        }}
        onChange={(e) => {
            setSearchQuery(e.target.value);
        }}
        onSubmitEditing={async (e) => {
            navigation.navigate("Search", {
            results: await search(searchQuery),
            });
            e.target.value = "";
        }}
        />
    </View>
  );
};

export default SearchBar;
