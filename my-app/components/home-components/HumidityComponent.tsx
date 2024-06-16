import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import tw from "twrnc";
import { Store } from "../../context/Store";

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
      onPress={() => navigation.navigate("humidity")}
      style={styles.container}
    >
      <View style={tw`flex flex-row`}>
        <View style={styles.iconContainer}>
          <Feather name="droplet" size={24} color="white" />
        </View>
      </View>
      <Text style={styles.title}>Humidity</Text>
      <Text style={styles.humidityValue}>{sensorData?.humidity}%</Text>
      <View style={styles.separator} />
      <Text style={styles.infoText}>Info</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: tw`flex flex-col flex-1 bg-white rounded-xl p-3`,
  iconContainer: tw`flex flex-row bg-blue-700 p-2 rounded-full`,
  title: tw`text-xl text-gray-500 py-4`,
  humidityValue: tw`text-3xl font-semibold text-gray-800 pb-2 text-center`,
  separator: tw`border-t border-gray-300 flex-1 pb-2`,
  infoText: tw`text-center text-lg text-red-700`,
  errorText: tw`text-center text-lg text-red-500 mt-2`,
});

export default HumidityComponent;
