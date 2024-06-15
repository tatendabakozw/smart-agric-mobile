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
import GeneralLayout from "../layouts/GeneralLayout";
import { data } from "../utils/data";
import { useCurrentDate } from "../hooks/useCurrentDate";
import { Store } from "../context/Store";

type Props = {};

const TemperatureScreen = (props: Props) => {
  const [current_temp, setCurrentTemp] = useState(data.OPTIMAL_TEMP);
  const [loading, setLoading] = useState(false);

  const { state } = useContext(Store);
  const { ip_address } = state;

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = useCurrentDate();

  const decrease_temp = async () => {
    setCurrentTemp((current_temp) => current_temp - 1);
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/relay_off`
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const increase_temp = async () => {
    setCurrentTemp((current_temp) => current_temp + 1);
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/relay_on`
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const auto_regulate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://${JSON.parse(ip_address).ip_address}/relay_on`
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <GeneralLayout>
      <View style={tw`flex flex-col p-3 rounded-xl bg-white`}>
        <Text style={tw`text-2xl font-semibold text-gray-700`}>
          Temperature
        </Text>
        <Text style={tw`text-gray-400 text-sm`}>
          You can control temperature from here
        </Text>
        <View
          style={tw`flex flex-col w-full p-4 rounded-xl border border-gray-100 w-full my-8`}
        >
          <View style={tw`flex flex-row w-full justify-between pb-4`}>
            <View style={tw`flex flex-col`}>
              <Text style={tw`text-3xl font-semibold text-gray-800`}>
                {current_temp}&#8451;
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
                  onPress={decrease_temp}
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
                      <Text style={tw`text-white`}>Fan On</Text>
                      {/* <Text style={tw`text-white text-lg font-bold`}>
                      {current_temp - 1}&#8451;
                    </Text> */}
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={increase_temp}
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
                      <Text style={tw`text-white`}>Fan Off</Text>
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

export default TemperatureScreen;

const styles = StyleSheet.create({});
