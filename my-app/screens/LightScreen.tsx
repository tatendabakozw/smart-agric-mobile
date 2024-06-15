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
import { ESP32_IP } from "../utils/apiUrl";
import GeneralLayout from "../layouts/GeneralLayout";

type Props = {};

const LightScreen = (props: Props) => {
  const [current_temp, setCurrentTemp] = useState(data.OPTIMAL_TEMP);
  const [loading, setLoading] = useState(false);

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = useCurrentDate();
  const turn_onLight = async () => {
    setLoading(true);
    setCurrentTemp((current_temp) => current_temp + 1);
    try {
      const { data } = await axios.get(`${ESP32_IP}/light_on`);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const turn_off_light = async () => {
    setLoading(true);
    setCurrentTemp((current_temp) => current_temp - 1);
    try {
      const { data } = await axios.get(`${ESP32_IP}/light_off`);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const auto_regulate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${ESP32_IP}/auto_regulate_light`);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          style={tw`flex flex-col w-full p-4 rounded-xl border border-gray-100 w-full my-8`}
        >
          <View style={tw`flex flex-row w-full justify-between pb-4`}>
            <View style={tw`flex flex-col`}>
              <Text style={tw`text-3xl font-semibold text-gray-800`}>
                {current_temp}%
              </Text>
              <Text style={tw`text-gray-400 text-sm`}>{currentDate}</Text>
            </View>
            {current_temp > data.OPTIMAL_TEMP + data.ERROR_MARGIN ? (
              <Text style={tw`text-lg font-semibold text-red-700`}>
                Above Required
              </Text>
            ) : current_temp < data.OPTIMAL_TEMP - data.ERROR_MARGIN ? (
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
              style={tw`absolute items-center self-center  right-0 left-0 -top-4 mr-auto ml-auto`}
            >
              <View
                style={tw`w-6 h-6 bg-white text-center rounded-full p-1 self-center`}
              ></View>
            </View>
            <View>
              <View style={tw`flex flex-row items-center justify-between`}>
                <TouchableOpacity
                  onPress={
                    loading ? () => console.log("loading") : turn_off_light
                  }
                  style={tw`flex flex-row items-center `}
                >
                  <MaterialCommunityIcons
                    name="thermometer-minus"
                    size={24}
                    color="white"
                  />
                  {loading ? (
                    <ActivityIndicator style={tw`text-white ml-2`} />
                  ) : (
                    <View style={tw`flex flex-col ml-2`}>
                      <Text style={tw`text-white`}>Light Off</Text>
                      {/* <Text style={tw`text-white text-lg font-bold`}>
                      {current_temp - 1}&#8451;
                    </Text> */}
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    loading ? () => console.log("loading") : turn_onLight
                  }
                  style={tw`flex flex-row items-center `}
                >
                  <MaterialCommunityIcons
                    name="thermometer-plus"
                    size={24}
                    color="white"
                  />
                  {loading ? (
                    <ActivityIndicator style={tw`text-white ml-2`} />
                  ) : (
                    <View style={tw`flex flex-col ml-2`}>
                      <Text style={tw`text-white`}>Light On</Text>
                      {/* <Text style={tw`text-white text-lg font-bold`}>
                      {current_temp + 1}&#8451;
                    </Text> */}
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={loading ? () => console.log("loading...") : auto_regulate}
          activeOpacity={0.7}
          style={tw`bg-red-600 p-4 rounded-lg`}
        >
          <Text
            style={tw`text-center text-lg font-semibold text-white uppercase`}
          >
            {loading ? "loading..." : "auto regulate"}
          </Text>
        </TouchableOpacity>
      </View>
    </GeneralLayout>
  );
};

export default LightScreen;

const styles = StyleSheet.create({});
