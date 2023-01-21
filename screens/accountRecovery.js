import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";

const AccountRecovery = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex flex-1 sm:items-center")}>
      <View
        style={tailwind(
          "flex flex-1 justify-between sm:justify-center sm:w-1/2 md:w-1/3 xl:w-1/5"
        )}
      >
        <View>
          <Image
            style={tailwind("w-full h-[250px] mb-4")}
            resizeMode="contain"
            source={require("../assets/logos/logo.png")}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="email"
            icon={require("../assets/icons/black/at.png")}
            keyboardType="email-address"
          />
        </View>
        <View>
          <RoundButton style={tailwind("bg-green-500 mb-2")} title="recover" />
          <View style={tailwind("flex flex-row justify-center")}>
            <Text style={tailwind("text-lg font-bold mb-4 mr-1")}>
              already have an account?
            </Text>

            <TouchableOpacity>
              <Text
                style={tailwind("text-xl text-lg font-bold text-green-500")}
              >
                login!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountRecovery;
