import React, { useEffect, useState } from "react";
import { Text, TextInput, View, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import PageContainer from "../components/pageContainer";

const DBDemo = () => {
  const [dbData, setDbData] = useState([]);
  const [dbInsert, setDbInsert] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/db/get")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDbData(data.response);
      });
  }, [dbInsert]);

  const tailwind = useTailwind();

  return (
    <PageContainer>
      <TextInput
        style={tailwind("text-lg")}
        placeholder="type data here, press enter to submit"
        onSubmitEditing={(e) => {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                storuuid: "kusdkds-jhbsdjkhbsd-jhvasdjhvsd",
                storename: "Mayank's Store",
                review: e.target.value,
              },
            }),
          };

          fetch("http://localhost:8000/api/db/addReview", options)
            .then((res) => res.json())
            .then((data) => setDbInsert(data.message))
            .catch((err) => console.error(err));

          e.target.value = "";
        }}
      />
      <View style={tailwind("mt-4")}>
        <Text style={tailwind("font-bold text-3xl")}>Backend data</Text>
        <FlatList
          inverted
          data={dbData}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={tailwind("text-lg")}>{item.data}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </PageContainer>
  );
};

export default DBDemo;
