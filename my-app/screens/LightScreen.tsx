import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import axios from "axios";
import { data } from "../utils/data";
import { useCurrentDate } from "../hooks/useCurrentDate";
import { Store } from "../context/Store";
import GeneralLayout from "../layouts/GeneralLayout";

type Props = {};

const LightScreen = (props: Props) => {
  const { state } = useContext(Store);
  const { ip_address } = state;

  const [currentTemp, setCurrentTemp] = useState(data.OPTIMAL_TEMP);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = useCurrentDate();

  const turnOnLight = async () => {
    if (!ip_address) {
      setError("IP address not set. Please configure the IP address.");
      return;
    }

    setLoading(true);
    setCurrentTemp((prevTemp) => prevTemp + 1);
    try {
      const response = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/light_on`
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to turn on the light. Please try again.");
    }
  };

  const turnOffLight = async () => {
    if (!ip_address) {
      setError("IP address not set. Please configure the IP address.");
      return;
    }

    setLoading(true);
    setCurrentTemp((prevTemp) => prevTemp - 1);
    try {
      const response = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/light_off`
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to turn off the light. Please try again.");
    }
  };

  const autoRegulate = async () => {
    if (!ip_address) {
      setError("IP address not set. Please configure the IP address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/auto_regulate_light`
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to auto regulate the light. Please try again.");
    }
  };

  return (
    <GeneralLayout>
      <View style={tw`flex flex-col p-3 bg-white rounded-lg`}>
        <Text style={tw`text-2xl font-semibold text-gray-700`}>
          Light Intensity
        </Text>
        <Text style={tw`text-gray-400 text-sm`}>
          You can control light value from here
        </Text>
        <View
          style={tw`flex flex-col w-full p-4 rounded-xl border border-gray-100 my-8`}
        >
          <View style={tw`flex flex-row w-full justify-between pb-4`}>
            <View style={tw`flex flex-col`}>
              <Text style={tw`text-3xl font-semibold text-gray-800`}>
                {currentTemp}%
              </Text>
              <Text style={tw`text-gray-400 text-sm`}>{currentDate}</Text>
            </View>
            {currentTemp > data.OPTIMAL_TEMP + data.ERROR_MARGIN ? (
              <Text style={tw`text-lg font-semibold text-red-700`}>
                Above Required
              </Text>
            ) : currentTemp < data.OPTIMAL_TEMP - data.ERROR_MARGIN ? (
              <Text style={tw`text-lg font-semibold text-gray-700`}>
                Below Required
              </Text>
            ) : (
              <Text style={tw`text-lg font-semibold text-green-700`}>
                Optimal
              </Text>
            )}
          </View>
          <View
            style={tw`relative flex flex-col bg-green-700 p-4 w-full rounded-xl`}
          >
            <View
              style={tw`absolute items-center self-center right-0 left-0 -top-4 mr-auto ml-auto`}
            >
              <View
                style={tw`w-6 h-6 bg-white text-center rounded-full p-1 self-center`}
              ></View>
            </View>
            <View style={tw`flex flex-row items-center justify-between`}>
              <TouchableOpacity
                onPress={loading ? () => console.log("loading") : turnOffLight}
                style={tw`flex flex-row items-center`}
              >
                <MaterialCommunityIcons
                  name="lightbulb-off-outline"
                  size={24}
                  color="white"
                />
                {loading ? (
                  <ActivityIndicator style={tw`ml-2`} color="white" />
                ) : (
                  <View style={tw`flex flex-col ml-2`}>
                    <Text style={tw`text-white`}>Light Off</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  loading ? () => console.log("loading") : () => turnOnLight()
                }
                style={tw`flex flex-row items-center`}
              >
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={24}
                  color="white"
                />
                {loading ? (
                  <ActivityIndicator style={tw`ml-2`} color="white" />
                ) : (
                  <View style={tw`flex flex-col ml-2`}>
                    <Text style={tw`text-white`}>Light On</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={
            loading ? () => console.log("loading...") : () => autoRegulate()
          }
          activeOpacity={0.7}
          style={tw`bg-red-600 p-4 rounded-lg`}
        >
          <Text
            style={tw`text-center text-lg font-semibold text-white uppercase`}
          >
            {loading ? "loading..." : "auto regulate"}
          </Text>
        </TouchableOpacity>
        {error && (
          <Text style={tw`text-center text-lg text-red-500 mt-2`}>{error}</Text>
        )}
      </View>
    </GeneralLayout>
  );
};

export default LightScreen;

const styles = StyleSheet.create({});
