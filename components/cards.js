import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { useTailwind } from "tailwind-rn";

const ListViewCard = ({
    title,
    image,
    rating,
    deliveryFee,
    deliveryTime,
    style,
}) => {
    const tailwind = useTailwind();
    return (
        <View style={[tailwind("bg-white rounded-xl min-h-[320px]"), style]}>
            <View
                style={tailwind(
                    "flex flex-row items-center text-white bg-black/40 absolute z-10 m-4 p-2.5 rounded-xl"
                )}
            >
                <Image
                    style={tailwind("w-4 h-4")}
                    resizeMode="contain"
                    source={require("../assets/icons/gold/star.png")}
                />
                <Text style={tailwind("text-white ml-2 font-bold")}>
                    {rating}
                </Text>
            </View>
            <Image
                source={{
                    uri: image,
                }}
                style={tailwind("object-cover w-full h-[200px] rounded-t-xl")}
            />
            <View style={tailwind("flex flex-1 justify-between p-2")}>
                <Text style={tailwind("text-lg font-bold")}>{title}</Text>
                <View
                    style={tailwind(
                        "flex w-full flex-row justify-between pt-2 font-bold"
                    )}
                >
                    <Text>${deliveryFee} delivery fee</Text>
                    <Text>{deliveryTime}</Text>
                </View>
            </View>
        </View>
    );
};

const RestaurantCard = ({
    title,
    image,
    style,
    rating
}) => {
    const tailwind = useTailwind();
    return (
        <TouchableOpacity style={[tailwind("bg-white rounded-xl min-h-[300px]"), style]}>
            <View
                style={tailwind(
                    "flex flex-row items-center text-white bg-black/40 absolute z-10 m-4 p-2.5 rounded-xl"
                )}
            >
                <Image
                    style={tailwind("w-4 h-4")}
                    resizeMode="contain"
                    source={require("../assets/icons/gold/star.png")}
                />
                <Text style={tailwind("text-white ml-2 font-bold")}>
                    {rating}
                </Text>
            </View>
            <Image
                source={{
                    uri: image,
                }}
                style={tailwind("object-cover w-full h-[200px] rounded-t-xl")}
            />
            <View style={tailwind("flex flex-1 justify-between p-2")}>
                <Text style={tailwind("text-lg font-bold")}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export { ListViewCard, RestaurantCard };