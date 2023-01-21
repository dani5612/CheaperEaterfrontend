import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

import { IconInput } from "../components/inputs";
import { RoundButton } from "../components/buttons";

const Login = ({ children }) => {
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
          <IconInput
            style={tailwind("mb-4")}
            placeholder="password"
            icon={require("../assets/icons/black/key.png")}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={tailwind(
                "text-center text-lg font-bold mb-2 text-green-500"
              )}
            >
              I forgot my password
            </Text>
          </TouchableOpacity>
          <RoundButton style={tailwind("bg-green-500 mb-2")} title="login" />
          <View style={tailwind("flex flex-row justify-center")}>
            <Text style={tailwind("text-lg font-bold mb-4 mr-1")}>
              don't have an account?
            </Text>

            <TouchableOpacity>
              <Text
                style={tailwind("text-xl text-lg font-bold text-green-500")}
              >
                Sign up!
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={tailwind("text-lg font-bold text-center mb-4")}>
            Sign in with
          </Text>
          <View style={tailwind("flex items-center")}>
            <View style={tailwind("flex-row justify-between w-1/2")}>
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
      </View>
    </View>
  );
};

export default Login;
