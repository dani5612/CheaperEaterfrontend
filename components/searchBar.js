// Turned into a functional component by Victor Mendez,
// Main structure by Mayank,
// Adapted and modified by Victor Mendez

import { search } from "../api/search";
import { useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isMobile } from "react-device-detect";
import { View, Image } from "react-native-web";

/**
 * Search bar component
 * @param {boolean} state of the foodTypes component
 * @param {function} function to change the state of the foodTypes component
 * @returns Search bar component
 * * */
const SearchBar = ({ isFoodTypesOpen, openFoodTypes, searchB }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const foodCategories = [
    { key: "Asian", logo: "🍜" },
    { key: "Mexican", logo: "🌮" },
    { key: "Italian", logo: "🍝" },
    { key: "Fast Food", logo: "🍔" },
    { key: "Indian", logo: "🍛" },
    { key: "Dessert", logo: "🍰" },
    { key: "Pizza", logo: "🍕" },
    { key: "Healthy", logo: "🥦" },
    { key: "Thai", logo: "🍤" },
    { key: "Chicken", logo: "🍗" },
    { key: "Japanese", logo: "🍣" },
    { key: "Seafood", logo: "🐟" },
    { key: "Vietnamese", logo: "🍥" },
    { key: "Salads", logo: "🥗" },
    { key: "Bowls", logo: "🍚" },
    { key: "Mediterranean", logo: "🥙" },
    { key: "Steak", logo: "🥩" },
  ];
  const openCategory = async (item) => {
    console.log(item);
    closeFoodTypes();
    navigation.navigate(
      navigation.navigate("Search", { results: await search(item) })
    );
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {!isFoodTypesOpen ? (
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
        )}

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
              ? Dimensions.get("window").width * 0.85
              : Dimensions.get("window").width * 0.4,
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
      <View style={{ flex: 1, justifyContent: "space-between" }}>
          {/* LIST OF CATEGORIES */}
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                margin: 5,
                marginBottom: 20,
              }}
            >
              Categories
            </Text>
            <FlatList
              numColumns={isMobile ? 0 : 4}
              data={foodCategories}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={
                    isMobile ? styles.catContainer : styles.webVerCatContainer
                  }
                  onPress={() => openCategory(item.key)}
                >
                  <Text style={isMobile ? styles.item : styles.webVerItem}>
                    {item.logo} {item.key}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 22,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 100,
  },
  item: {
    fontSize: 20,
  },
  webVerItem: {
    fontSize: 15,
    minHeight: 30,
  },
  catContainer: {
    padding: 15,
    paddingVertical: 20,
    paddingLeft: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,
    margin: ".5%",
    flex: 1,
    borderRadius: 5,
  },
  webVerCatContainer: {
    maxWidth: "24%",
    padding: 15,
    paddingVertical: 20,
    paddingLeft: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    margin: ".5%",
    flex: 1,
    borderRadius: 5,
  },
});

export default SearchBar;
