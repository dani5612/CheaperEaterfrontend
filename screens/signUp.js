import { useRef } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

import { IconInput } from "../components/inputs";

const SignUp = () => {
  const tailwind = useTailwind();
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const email = useRef("");
  const name = useRef("");
  const password = useRef("");
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
            placeholder="name"
            icon={require("../assets/icons/black/person.png")}
            ref={name}
            onChange={(e) => {
              name.current = e;
            }}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="email"
            icon={require("../assets/icons/black/at.png")}
            keyboardType="email-address"
            ref={email}
            onChange={(e) => {
              email.current = e;
            }}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="password"
            icon={require("../assets/icons/black/key.png")}
            secureTextEntry={true}
            ref={password}
            onChange={(e) => {
              password.current = e;
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    name: name.current,
                    email: email.current,
                    password: password.current,
                  },
                }),
              };

              fetch("http://localhost:8000/api/auth/signup", options)
                .then((res) => res.json())
                .catch((err) => console.error(err));
            }}
            style={[
              tailwind(
                "bg-green-500 mb-2 flex justify-center items-center rounded-full p-4"
              ),
            ]}
          >
            <Text style={tailwind("text-white text-xl font-bold")}>
              Sign Up
            </Text>
          </TouchableOpacity>

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

export default SignUp;
