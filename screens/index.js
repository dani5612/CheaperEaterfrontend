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

import { useState, useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import ModalView from "../components/modal";
import { getBreakPoint } from "../utils/screen";

import { search } from "../api/search";
import FoodTypes from "../components/foodTypes";
import { TouchableWithoutFeedback } from "react-native-web";
import  SearchBar  from "../components/searchBar";
import { popularPicks } from "../api/get";
import { addressDetailsContext } from "../contexts/AddressContext";


const Index = () => {
  const navigation = useNavigation();
  //saving location details to to the local storage of the website

  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 4 };
  const window = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const [isFoodTypesOpen, setFoodTyoesScreen] = useState(false);

  const [popularRestaurants, setPopularRestaurants] = useState({ stores: [] });
  const foodTypesRef = useRef(null);
  const searchBarRef = useRef(null);
  const address = useContext(addressDetailsContext);
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
      if (
        address[0]?.address?.address1 &&
        address[0]?.address?.address1 !== "Set Location"
      ) {
        setPopularRestaurants(await popularPicks());
      }
    })();
  }, []);

  return (
    <PageContainer>
      {/* Runs for the first time when the location hasn't been set by the cookies*/}
      {address[0]?.address?.address1 === "Set Location" ||
      !address[0]?.address?.address1 ? (
        <>
          <ImageBackground
            style={[
              {
                flex: 1,
                justifyContent: "center",
              },
            ]}
            source={require("../assets/background/background.png")}
          >
            <ModalView
              visible={true}
              setVisible={setVisible}
              setPopularRestaurants={setPopularRestaurants}
            />
          </ImageBackground>
        </>
      ) : (
        <View style={tailwind("m-2")}>
          <ModalView
            visible={visible}
            setVisible={setVisible}
            setPopularRestaurants={setPopularRestaurants}
          />

          <View style={tailwind("flex flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-2xl font-bold")}>
                Give yourself a treat!🥘
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
                {/* {address?.address?.address1} */}
                {address[0].address.address1}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tailwind("flex flex-row items-center")}>
            

            <SearchBar isFoodTypesOpen openFoodTypes = { () => setFoodTyoesScreen } />
          </View>

          {isFoodTypesOpen ? (
            
              <View ref={foodTypesRef} >
                <FoodTypes  closeFoodTypes={() => setFoodTyoesScreen} />
              </View>
          ) : (
            <View style={tailwind("flex")}>
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
        </View>
      )}
    </PageContainer>
  );
};

export default Index;
