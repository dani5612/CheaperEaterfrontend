import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { isMobile } from "react-device-detect";
import { search } from "../api/search";

const FoodTypes = ({ closeFoodTypes }) => {
  const navigation = useNavigation();
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

  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex flex-1")}>
      <View
      // style={tailwind(
      //   "flex flex-1 justify-between sm:justify-center sm:w-1/2 md:w-1/3 xl:w-1/5"
      // )}
      >
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
    //width:"25%",
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

  //SEARCH
  searchBar: {
    padding: 15,
    paddingVertical: 18,
    backgroundColor: "lightgray",
    marginTop: 20,
    borderRadius: 100,
    marginHorizontal: 10,
    fontSize: 15,
    color: "gray",
  },
});

export default FoodTypes;
