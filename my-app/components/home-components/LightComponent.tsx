import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Store } from "../../context/Store";

type Props = {};

const LightComponent = (props: Props) => {
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data from ESP32:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("light")}
      style={tw`flex flex-col flex-1 bg-white rounded-xl p-3 my-2`}
    >
      <View style={tw`flex flex-row`}>
        <View style={tw`flex flex-row bg-gray-700 p-2 rounded-full`}>
          <Entypo name="light-down" size={24} color="white" />
        </View>
      </View>
      <Text style={tw`text-xl text-gray-500 py-4`}>Light Intensity</Text>
      <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
        {" "}
        {sensorData.ldr}
      </Text>
      <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
      <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
    </TouchableOpacity>
  );
};

export default LightComponent;

const styles = StyleSheet.create({});
