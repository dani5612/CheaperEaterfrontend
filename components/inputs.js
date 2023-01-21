import { View, TextInput, Image } from "react-native";
import { useTailwind } from "tailwind-rn";

const IconInput = ({
    icon,
    placeholder,
    style,
    keyboardType = "default",
    secureTextEntry = false,
}) => {
    const tailwind = useTailwind();
    return (
        <View
            style={[
                tailwind(
                    "flex flex-row rounded-full justify-center items-center p-4"
                ),
                style,
            ]}
        >
            <Image
                style={tailwind("w-5 h-5 mx-4")}
                source={icon}
                resizeMode="contain"
            />
            <TextInput
                style={tailwind("w-full h-full outline-none")}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

export { IconInput };
