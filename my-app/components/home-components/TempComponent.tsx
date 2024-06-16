import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { data } from "../../utils/data";
import { Store } from "../../context/Store";

type Props = {};

const TempComponent = (props: Props) => {
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

  const current_temp = sensorData?.temperature || 21;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      // @ts-ignore
      onPress={() => navigation.navigate("temperature")}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="coolant-temperature"
            size={24}
            color="white"
          />
        </View>
        <Text style={styles.title}>Temp</Text>
        {current_temp > data.OPTIMAL_TEMP + data.ERROR_MARGIN ? (
          <Text style={styles.statusAbove}>Above Required</Text>
        ) : current_temp < data.OPTIMAL_TEMP - data.ERROR_MARGIN ? (
          <Text style={styles.statusBelow}>Below Required</Text>
        ) : (
          <Text style={styles.statusOptimal}>Optimal</Text>
        )}
      </View>
      <Text style={styles.temperature}>
        {sensorData?.temperature ? sensorData.temperature : current_temp}&#8451;
      </Text>
      <View style={styles.separator} />
      <Text style={styles.infoText}>Info</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: tw`flex flex-col bg-white rounded-xl p-4 mb-2`,
  header: tw`flex flex-row items-center justify-between`,
  iconContainer: tw`flex flex-row bg-green-700 p-2 rounded-full`,
  title: tw`text-xl text-gray-500 py-4`,
  statusAbove: tw`text-lg font-semibold text-red-700`,
  statusBelow: tw`text-lg font-semibold text-blue-700`,
  statusOptimal: tw`text-lg font-semibold text-green-700`,
  temperature: tw`text-3xl font-semibold text-gray-800 pb-2 text-center`,
  separator: tw`border-t border-gray-300 flex-1 pb-2`,
  infoText: tw`text-center text-lg text-red-700`,
  errorText: tw`text-center text-lg text-red-500 mt-2`,
});

export default TempComponent;
