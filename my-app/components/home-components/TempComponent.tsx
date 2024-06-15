import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { ESP32_IP } from "../../utils/apiUrl";
import axios from "axios";
import { data } from "../../utils/data";
import { Store } from "../../context/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const TempComponent = (props: Props) => {
  const navigation = useNavigation();
  const current_temp = 21;
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
  // console.log(`http://${JSON.parse(ip_address).ip_address}/data`);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      // @ts-ignore
      onPress={() => navigation.navigate("temperature")}
      style={tw`flex flex-col bg-white rounded-xl p-4 mb-2`}
    >
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex flex-row bg-green-700 p-2 rounded-full`}>
            <MaterialCommunityIcons
              name="coolant-temperature"
              size={24}
              color="white"
            />
          </View>
          <Text style={tw`text-xl text-gray-500 py-4`}>Temp</Text>
        </View>
        {current_temp > data.OPTIMAL_TEMP + data.ERROR_MARGIN ? (
          <Text style={tw`text-lg font-semibold text-red-700`}>
            Above Required
          </Text>
        ) : current_temp < data.OPTIMAL_TEMP - data.ERROR_MARGIN ? (
          <Text style={tw`text-lg font-semibold text-blue-700`}>
            Below Required
          </Text>
        ) : (
          <Text style={tw`text-lg font-semibold text-green-700`}>Optimal</Text>
        )}
      </View>
      <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
        {" "}
        {sensorData?.temperature ? sensorData?.temperature * 100 : current_temp}
        &#8451;
      </Text>
      <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
      <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
    </TouchableOpacity>
  );
};

export default TempComponent;

const styles = StyleSheet.create({});
