/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";

const ModalView = ({ visible, children, setVisible, setAddress }) => {
  const tailwind = useTailwind();
  const window = useWindowDimensions();
  const [addressInput, setAddressInput] = useState("");
  const [addressArray, setAddressArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/autocomplete/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: addressInput }),
    })
      .then((res) => res.json())
      .then((json) => setAddressArray(json))
      .catch((err) => console.error("error:" + err));
  }, [addressInput]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible} style>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 5,
            maxHeight:
              Platform.OS === "web" ? window.height * 0.6 : window.height * 0.5,
          }}
        >
          <View
            style={[
              tailwind(
                "flex flex-row rounded-full justify-center items-center p-4 mb-4"
              ),
            ]}
          >
            <Image
              style={[
                tailwind("mx-4"),
                { width: window.width * 0.09, height: window.height * 0.06 },
              ]}
              source={require("../assets/icons/black/location.png")}
              resizeMode="contain"
            />
            <TextInput
              style={[
                tailwind("w-full h-full outline-none"),
                { fontSize: window.width * 0.04 },
              ]}
              placeholder="Enter delivery address"
              placeholderTextColor={"#ababab"}
              onChange={(e) => setAddressInput(e.target.value)}
            />
          </View>
          <FlatList
            style={{
              borderWidth: 1,
              borderRadius: 10,
              minWidth:
                Platform.OS === "web"
                  ? window.width - window.width * 0.3
                  : window.width - window.width * 0.1,
              maxHeight:
                Platform.OS === "web"
                  ? window.height - window.height * 0.3
                  : null,
            }}
            data={addressArray}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  fetch("http://localhost:8000/api/detail/location", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addressArray[index]),
                  })
                    .then((res) => res.json())
                    .then((json) => {
                      [
                        setAddress(json),
                        localStorage.setItem("address", JSON.stringify(json)),
                        fetch("http://localhost:8000/api/set/location", {
                          credentials: "include",
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(json),
                        }).catch((err) => console.error("error:" + err)),
                      ];
                    })
                    .catch((err) => console.error("error:" + err));
                  setVisible(false);
                }}
              >
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: index === 4 ? 0 : 1,
                  }}
                >
                  <Text style={{ fontSize: 25 }}>
                    {item.addressLine1 + ", " + item.addressLine2}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;
