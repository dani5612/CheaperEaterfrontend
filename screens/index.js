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
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import ModalView from "../components/modal";
import { getBreakPoint } from "../utils/screen";
import { search } from "../api/search";
import FoodTypes from "../components/foodTypes";
import { TouchableWithoutFeedback } from "react-native-web";
import  SearchBar  from "../components/searchBar";

const Index = () => {
  const navigation = useNavigation();
  //saving location details to to the local storage of the website

  // const foodTypeRef = useRef(null);

  // const handlePressOutsideFoodType = () => {

  //   setFoodTyoesScreen(false);
  //   console.log("Clicked outside food type");
  // }

  // useEffect(() => {

  //   function handleClickOutsideFoodType  (event)  {
  //     if (foodTypeRef.current && !foodTypeRef.current.contains(event.target)) {
  //       handlePressOutsideFoodType();
  //     } else {
  //       console.log("Clicked inside food type");
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutsideFoodType, true)

  //   return () => {
  //     document.removeEventListener("click", handleClickOutsideFoodType, true)
  //   }

  // }, [foodTypeRef]);

  //const foodTypeRef = useRef(null);

  if (JSON.parse(localStorage.getItem("address") === null)) {
    localStorage.setItem(
      "address",
      JSON.stringify({ address: { address1: "Set Location" } })
    );
  }
  const tailwind = useTailwind();
  const numColumns = { sm: 2, lg: 4, xl: 4 };
  const window = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [address, getAddress] = useState(
    JSON.parse(localStorage.getItem("address"))
  );
  
  const [popularRestaurants, setPopularRestaurants] = useState({ stores: [] });

  const [isFoodTypesOpen, setFoodTyoesScreen] = useState(false);

  return (
    <PageContainer style={tailwind("m-2")}>
      {/* Runs for the first time when the location hasn't been set by the cookies*/}
      {console.log("Point 1")}
      {address.address.address1 === "Set Location" ? (
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
              setAddress={getAddress}
              setPopularRestaurants={setPopularRestaurants}
            />
          </ImageBackground>
        </>
      ) : (
        <>
          <ModalView
            visible={visible}
            setVisible={setVisible}
            setAddress={getAddress}
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
          <TouchableOpacity
            // Shows up the modal for the location setup when clicked on the location button
            onPress={() => setVisible(true)}
            style={tailwind("w-max")}
          >
            <View style={tailwind("flex flex-row rounded-full items-center")}>
              <Image
                style={tailwind("w-4 h-4")}
                resizeMode="contain"
                source={require("../assets/icons/black/location.png")}
              />
              <Text style={tailwind("font-light ml-2")}>
                {address.address.address1}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={tailwind("flex flex-row items-center")}>
            

            <SearchBar isFoodTypesOpen openFoodTypes = { () => setFoodTyoesScreen } />

          </View>

          {isFoodTypesOpen ? (
            
              <View >
                <FoodTypes  closeFoodTypes={() => setFoodTyoesScreen} />
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
              {popularRestaurants.stores.length != 0 ? (
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
