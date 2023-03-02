import { search } from "../api/search";
import { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { Platform, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

    <View>
    {
        !isFoodTypesOpen ? (
          <Image
            style={tailwind("w-5 h-5")}
            resizeMode="contain"
            source={require("../assets/icons/black/search.png")}
          />
        ) : (
          <TouchableOpacity onPress={() => openFoodTypes(false)}>
            <Image
              style={tailwind("w-5 h-5")}
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
            height: 40,
            margin: 12,
            borderLeftWidth: 1,
            padding: 10,
            width: Platform.OS === "web" ? window.width / 2 : window.width,
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
