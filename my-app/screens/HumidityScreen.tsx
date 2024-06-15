import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GeneralLayout from "../layouts/GeneralLayout";
import React, { useState } from "react";
import { data } from "../utils/data";
import tw from "twrnc";

type Props = {};

const HumidityScreen = (props: Props) => {
  const [current_humid, setCurrentTemp] = useState(data.OPTIMAL_TEMP);

  const increase_temp = () => {
    setCurrentTemp((current_humid) => current_humid + 1);
  };

  const decrease_temp = () => {
    setCurrentTemp((current_humid) => current_humid - 1);
  };
  return (
    <GeneralLayout>
      <View style={tw`flex flex-col p-3 rounded-lg bg-white`}>
        <Text style={tw`text-2xl font-semibold text-gray-700`}>Humidity</Text>
        <Text style={tw`text-gray-400 text-sm`}>
          You can control humidity from here
        </Text>
        <View
          style={tw`flex flex-col w-full p-4 rounded-xl border border-gray-100 w-full my-8`}
        >
          <View style={tw`flex flex-row w-full justify-between pb-4`}>
            <View style={tw`flex flex-col`}>
              <Text style={tw`text-3xl font-semibold text-gray-800`}>
                {current_humid}&#x25;
              </Text>
              <Text style={tw`text-gray-400 text-sm`}>19 November 2022</Text>
            </View>
            {current_humid > data.OPTIMAL_HUMID + data.ERROR_MARGIN ? (
              <Text style={tw`text-lg font-semibold text-red-700`}>
                Above Required
              </Text>
            ) : current_humid < data.OPTIMAL_HUMID - data.ERROR_MARGIN ? (
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
            style={tw`relative flex flex-col bg-blue-700 p-4 w-full rounded-xl`}
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
                    name="chevron-down"
                    size={24}
                    color="white"
                  />
                  {/* <Text style={tw`text-white font-bold text-3xl`}>-</Text> */}
                  <View style={tw`flex flex-col ml-2`}>
                    <Text style={tw`text-white`}>Dec Humidity</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      {current_humid - 1}&#x25;
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={increase_temp}
                  style={tw`flex flex-row items-center `}
                >
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={24}
                    color="white"
                  />
                  {/* <Text style={tw`text-white font-bold text-3xl`}>+</Text> */}
                  <View style={tw`flex flex-col ml-2`}>
                    <Text style={tw`text-white`}>Inc Humidity</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      {current_humid + 1}&#x25;
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={tw`bg-red-600 p-4 rounded-lg`}
        >
          <Text style={tw`text-center text-lg font-semibold text-white`}>
            RESET
          </Text>
        </TouchableOpacity>
      </View>
    </GeneralLayout>
  );
};

export default HumidityScreen;

const styles = StyleSheet.create({});
