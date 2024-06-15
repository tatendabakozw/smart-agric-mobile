import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../../context/Store";
import axios from "axios";

type Props = {};

const HumidityComponent = (props: Props) => {
  const navigation = useNavigation();
  const { state } = useContext(Store);
  const { ip_address } = state;

  const [sensorData, setSensorData] = useState({
    ldr: 0,
    humidity: 0,
    temperature: 0,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/data`
      );
      setSensorData(response.data);
    } catch (error) {
      console.error("Error fetching data from ESP32:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      // @ts-ignore
      onPress={() => navigation.navigate("humidity")}
      style={tw`flex flex-col flex-1 bg-white rounded-xl p-3 `}
    >
      <View style={tw`flex flex-row`}>
        <View style={tw`flex flex-row bg-blue-700 p-2 rounded-full`}>
          <Feather name="droplet" size={24} color="white" />
        </View>
      </View>
      <Text style={tw`text-xl text-gray-500 py-4`}>Humidity</Text>
      <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
        {" "}
        {sensorData?.humidity}
        &#x25;
      </Text>
      <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
      <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
    </TouchableOpacity>
  );
};

export default HumidityComponent;

const styles = StyleSheet.create({});
