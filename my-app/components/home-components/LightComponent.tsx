import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Store } from "../../context/Store";

type SensorData = {
  ldr: number;
  humidity: number;
  temperature: number;
};

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

  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!ip_address) {
      setError("IP address not set. Please configure the IP address.");
      return;
    }
    try {
      const response = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/data`
      );
      setSensorData(response.data);
      setError(null);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data from ESP32:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, [ip_address]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
      {error ? (
        <Text style={tw`text-xs font-semibold text-red-800 pb-2 text-center`}>
          {error}
        </Text>
      ) : (
        <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
          {sensorData.ldr}
        </Text>
      )}

      <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
      <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
    </TouchableOpacity>
  );
};

export default LightComponent;

const styles = StyleSheet.create({});
