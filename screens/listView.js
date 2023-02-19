import { Text, View, Image, FlatList, useWindowDimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { ListViewCard } from "../components/cards";
import PageContainer from "../components/pageContainer";

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

const ListView = ({ route }) => {
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();

  return (
    <PageContainer>
      <View>
        <View style={tailwind("flex flex-row justify-between")}>
          <View>
            <Text style={tailwind("text-3xl font-bold")}>
              Hello {faker.name.firstName()} 👋
            </Text>
            <Text style={tailwind("text-lg font-light")}>
              {"It's lunch time!"}
            </Text>
          </View>
          <Image
            style={tailwind("w-5 h-5")}
            resizeMode="contain"
            source={require("../assets/icons/black/search.png")}
          />
        </View>
        <View style={tailwind("my-3")}>
          <Text style={tailwind("text-2xl font-bold")}>Nearby food</Text>
          <View style={tailwind("flex flex-row items-center")}>
            <Image
              style={tailwind("w-4 h-4")}
              resizeMode="contain"
              source={require("../assets/icons/black/location.png")}
            />
            <Text style={tailwind("font-light ml-2")}>
              {JSON.parse(localStorage.getItem("address")).address.address1}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={route.params.results[0].stores}
        renderItem={({ item }) => {
          return (
            <View style={[tailwind("flex flex-1 ")]}>
              <ListViewCard
                style={tailwind("m-2")}
                title={item.title}
                image={item.image}
                deliveryFee={item.deliveryFee}
                deliveryTime={item.estimatedDeliveryTime}
                rating={
                  item.rating === null
                    ? "No Ratings Found"
                    : item.rating.toFixed(1)
                }
              />
            </View>
          );
        }}
        key={getBreakPoint(window.width)}
        numColumns={numColumns[getBreakPoint(window.width)]}
        keyExtractor={(item) => item.id}
      />
    </PageContainer>
  );
};

export default ListView;
