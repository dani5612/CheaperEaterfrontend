/* eslint-disable no-unused-vars */
import {
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import ModalView from "../components/modal";
import { getBreakPoint } from "../utils/screen";
import { search } from "../api/search";
import { popularPicks } from "../api/get";
import FoodTypes from "./foodTypes";

const Index = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const numColumns = { sm: 2, lg: 4, xl: 4 };
  const window = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [popularRestaurants, setPopularRestaurants] = useState({ stores: [] });

  const [foodTypeScreen, showFoodTypeScreen] = useState(false);
  const foodTypesRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        foodTypesRef.current &&
        !foodTypesRef.current.contains(event.target) &&
        !searchBarRef.current.isFocused()
      ) {
        showFoodTypeScreen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const storedAddress = JSON.parse(await AsyncStorage.getItem("address"));
      setAddress(storedAddress);

      if (!storedAddress?.address?.address1) {
        await AsyncStorage.setItem(
          "address",
          JSON.stringify({ address: { address1: "Set Location" } })
        );
      } else if (
        storedAddress?.address?.address1 &&
        storedAddress?.address?.address1 !== "Set Location"
      ) {
        setPopularRestaurants(await popularPicks());
      }
    })();
  }, []);

  return (
    <PageContainer style={tailwind("m-2")}>
      {/* Runs for the first time when the location hasn't been set by the cookies*/}
      {console.log("Point 1")}
      {address?.address?.address1 === "Set Location" ||
      !address?.address?.address1 ? (
        <>
          {console.log("Point 2")}
          <ImageBackground
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            source={require("../assets/background/background.png")}
          >
            <ModalView
              visible={true}
              setVisible={setVisible}
              setAddress={setAddress}
              setPopularRestaurants={setPopularRestaurants}
            />
          </ImageBackground>
        </>
      ) : (
        <>
          <ModalView
            visible={visible}
            setVisible={setVisible}
            setAddress={setAddress}
            setPopularRestaurants={setPopularRestaurants}
          />

          <View style={tailwind("flex flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-3xl font-bold")}>
                Hey!! How are you doing? 🥘
              </Text>
            </View>
            <Image
              style={[tailwind("w-9 h-9"), { borderRadius: 20 }]}
              resizeMode="contain"
              source={{ uri: faker.image.avatar() }}
            />
          </View>
          <View style={tailwind("flex flex-row")}>
            <TouchableOpacity
              // Shows up the modal for the location setup when clicked on the location button
              onPress={() => setVisible(true)}
              style={tailwind("flex-row")}
            >
              <Image
                style={tailwind("w-4 h-4")}
                resizeMode="contain"
                source={require("../assets/icons/black/location.png")}
              />
              <Text style={tailwind("font-light ml-2")}>
                {address?.address?.address1}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tailwind("flex flex-row items-center")}>
            {!foodTypeScreen ? (
              <Image
                style={tailwind("w-5 h-5")}
                resizeMode="contain"
                source={require("../assets/icons/black/search.png")}
              />
            ) : (
              <TouchableOpacity onPress={() => showFoodTypeScreen(false)}>
                <Image
                  style={tailwind("w-5 h-5")}
                  resizeMode="contain"
                  source={require("../assets/icons/black/back.png")}
                />
              </TouchableOpacity>
            )}

            <TextInput
              ref={searchBarRef}
              placeholder="What would you like to eat?"
              onFocus={() => showFoodTypeScreen(true)}
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

          {foodTypeScreen ? (
            <View ref={foodTypesRef}>
              <FoodTypes closeFoodTypes={() => showFoodTypeScreen(false)} />
            </View>
          ) : (
            <View>
              <View
                style={[
                  tailwind("flex flex-row justify-between"),
                  {
                    alignItems: "center",
                    alignContent: "center",
                    paddingBottom: 15,
                  },
                ]}
              >
                <Text style={[tailwind("text-2xl font-bold")]}>
                  Main Course
                </Text>

                <TouchableOpacity>
                  <Text style={[tailwind("font-bold text-orange-500")]}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Shows the popular restaurants in the area when the location is selected */}
              {popularRestaurants?.stores?.length != 0 ? (
                <FlatList
                  data={popularRestaurants.stores}
                  renderItem={({ item }) => {
                    return (
                      <View style={[tailwind("flex flex-1 ")]}>
                        <RestaurantCard
                          style={tailwind("m-2")}
                          title={item.title}
                          image={item.image}
                          rating={
                            item.rating === null
                              ? "No Ratings Found"
                              : item.rating.toFixed(1)
                          }
                          onPress={() => {
                            console.log(item.title);
                          }}
                        />
                      </View>
                    );
                  }}
                  key={getBreakPoint(window.width)}
                  numColumns={numColumns[getBreakPoint(window.width)]}
                  keyExtractor={(item) => item.id}
                />
              ) : (
                <></>
              )}
            </View>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default Index;
