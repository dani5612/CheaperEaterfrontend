/* eslint-disable no-unused-vars */
import { useTailwind } from "tailwind-rn";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { Image } from "react-native-web";
import { faker } from "@faker-js/faker";
import { ListViewCard } from "../components/cards";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";

let ORDER = [];
Array.from({ length: 3 }).forEach((_, index) => {
  ORDER.push({
    title: faker.company.name(),
    rating: (Math.random() * (5 - 1) + 1).toFixed(1),
    image: faker.image.food(_, _, true),
    id: index,

    foodPrice: (Math.floor(Math.random() * 10) + 9.99).toFixed(2),
    serviceFee: (Math.floor(Math.random() * 10) + 1).toFixed(2),
    deliveryFee: (Math.floor(Math.random() * 10) + 1).toFixed(2),
    deliveryTime: `${Math.floor(Math.random() * 5) + 1}-${
      Math.floor(Math.random() * 15) + 5
    } min`,
  });
});

const getBreakPoint = (width) => {
  const breakPoints = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  if (width <= breakPoints.sm) {
    return "sm";
  }
  if (width <= breakPoints.md) {
    return "md";
  } else if (width <= breakPoints.lg) {
    return "lg";
  } else {
    return "xl";
  }
};

const Checkout = () => {
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  return (
    <View style={tailwind("flex sm:items-left")}>
      <View style={tailwind("justify-center")}>
        <Image
          style={tailwind("w-full h-[150px] mb-4")}
          resizeMode="contain"
          source={require("../assets/logos/celogo.png")}
        />
        <View style={tailwind("flex-row")}>
          <View>
            <Text style={tailwind("text-3xl font-bold")}>MY CART </Text>
            <Text style={tailwind("text-lg font-light")}>
              {"Order Summary"}
            </Text>
          </View>
          <Image
            style={[tailwind("w-8 h-8"), { borderRadius: 20 }]}
            resizeMode="contain"
            source={{ uri: faker.image.avatar() }}
          />
        </View>
        <View>
          <FlatList
            data={ORDER}
            renderItem={({ item }) => {
              return (
                <View style={[tailwind("flex flex-1 ")]}>
                  <ListViewCard
                    style={tailwind("m-2")}
                    title={item.title}
                    image={item.image}
                    foodPrice={item.foodPrice}
                    serviceFee={item.serviceFee}
                    deliveryFee={item.deliveryFee}
                    totalPrice={(
                      Number(item.foodPrice) +
                      Number(item.serviceFee) +
                      Number(item.deliveryFee)
                    ).toFixed(2)}
                    deliveryTime={item.deliveryTime}
                    rating={item.rating}
                  />
                </View>
              );
            }}
            key={getBreakPoint(window.width)}
            numColumns={numColumns[getBreakPoint(window.width)]}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={tailwind("flex-row")}>
          <TouchableOpacity>
            <Image
              style={tailwind("w-10 h-10")}
              resizeMode="contain"
              source={require("../assets/icons/socialmedia/google.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              style={tailwind("w-10 h-10")}
              resizeMode="contain"
              source={require("../assets/icons/socialmedia/facebook.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              style={tailwind("w-10 h-10")}
              resizeMode="contain"
              source={require("../assets/icons/socialmedia/twitter.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    //  </View>
  );
};

export default Checkout;
