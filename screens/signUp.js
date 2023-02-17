/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

import { IconInput } from "../components/inputs";

const SignUp = () => {
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dbInsert, setDbInsert] = useState([]);
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
            onChange={(e) => setName(e)}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="email"
            icon={require("../assets/icons/black/at.png")}
            keyboardType="email-address"
            onChange={(e) => setEmail(e)}
          />
          <IconInput
            style={tailwind("mb-4")}
            placeholder="password"
            icon={require("../assets/icons/black/key.png")}
            secureTextEntry={true}
            onChange={(e) => setPassword(e)}
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
                    name: name,
                    email: email,
                    password: password,
                  },
                }),
              };

              fetch("http://localhost:8000/api/db/addcred", options)
                .then((res) => res.json())
                .then((data) => setDbInsert(data.message))
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
