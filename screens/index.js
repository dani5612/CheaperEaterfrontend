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
import { useEffect, useState } from "react";
import PageContainer from "../components/pageContainer";
import { RestaurantCard } from "../components/cards";
import ModalView from "../components/modal";
import FoodTypes from "./foodTypes";

const getBreakPoint = (width) => {
  const breakPoints = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  if (width <= breakPoints.sm) {
    return "sm";
  }
  if (width <= breakPoints.lg) {
    return "lg";
  } else {
    return "xl";
  }
};

const MenuList = () => {
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
  const [searchQuery, setSearchQuery] = useState("");

  let RestaurantArray = [];

  for (let i = 0; i < 11; i++) {
    RestaurantArray.push({
      title: faker.company.name(),
      id: i,
      image: faker.image.food(),
    });
  }

  useEffect(() => {
    if (address.address.address1 != "Set Location") {
      fetch("http://localhost:8000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query: searchQuery,
        }),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }
  }, [searchQuery]);

  const [foodTypeScreen, showFoodTypeScreen] = useState(false);

  return (
    <PageContainer style={tailwind("m-2")}>
      {address.address.address1 === "Set Location" ? (
        <>
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
            />
          </ImageBackground>
        </>
      ) : (
        <>
          <ModalView
            visible={visible}
            setVisible={setVisible}
            setAddress={getAddress}
          />
          <View style={tailwind("flex flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-3xl font-bold")}>Delivery 🥘</Text>
            </View>
            <Image
              style={[tailwind("w-9 h-9"), { borderRadius: 20 }]}
              resizeMode="contain"
              source={{ uri: faker.image.avatar() }}
            />
          </View>
          <TouchableOpacity onPress={() => setVisible(true)}>
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
                if (address.address.address1 === "Set Location") {
                  setVisible(true);
                } else {
                  setSearchQuery(e.target.value);
                }
              }}
            ></TextInput>
          </View>
          {/* Here */}
          {foodTypeScreen ? (
            <View>
              <FoodTypes closeFoodTypes={() => showFoodTypeScreen(false)} />
              {/* Aqui dejando el food course cuz it needs tobe at the button #lmao */}
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

              <FlatList
                data={RestaurantArray}
                renderItem={({ item }) => {
                  return (
                    <View style={[tailwind("flex flex-1 ")]}>
                      <RestaurantCard
                        style={tailwind("m-2")}
                        title={item.title}
                        image={item.image}
                        rating={(Math.random() * (5 - 1) + 1).toFixed(1)}
                      />
                    </View>
                  );
                }}
                key={getBreakPoint(window.width)}
                numColumns={numColumns[getBreakPoint(window.width)]}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default MenuList;
