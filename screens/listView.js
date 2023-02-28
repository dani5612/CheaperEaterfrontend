import { Text, View, Image, FlatList, useWindowDimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { ListViewCard } from "../components/cards";
import PageContainer from "../components/pageContainer";
import { getBreakPoint } from "../utils/screen";
import { getLocalStorage } from "../api/localStorage";
import { search } from "../api/search";

const ListView = ({ route }) => {
  const tailwind = useTailwind();
  const numColumns = { sm: 2, md: 3, lg: 4, xl: 5 };
  const window = useWindowDimensions();
  const [searchResults, setSearchResults] = useState({
    cookies: {},
    data: [],
  });

  useEffect(() => {
    (async () => {
      setSearchResults(
        await search(route.params.searchStr, await getLocalStorage("cookies"))
      );
    })();
  }, []);

  return (
    <PageContainer style={tailwind("m-2")}>
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
              {route.params.address}
            </Text>
          </View>
        </View>
      </View>
      {searchResults.data.length != 0 ? (
        <FlatList
          data={searchResults.data[0].stores}
          renderItem={({ item }) => {
            return (
              <View style={[tailwind("flex flex-1 ")]}>
                <ListViewCard
                  style={tailwind("m-2")}
                  title={item.title}
                  image={item.image}
                  deliveryFee={item.deliveryFee}
                  deliveryTime={item.deliveryTime}
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
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default ListView;
