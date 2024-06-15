import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {};

const HomeHeader = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const nav_options = [
    { name: "Overview", screen: "home" },
    { name: "Setup", screen: "setup" },
  ];
  return (
    <View style={tw`flex flex-1 flex-col w-full bg-white rounded-xl my-4`}>
      <View style={tw`flex flex-row items-center p-1 bg-white rounded-xl`}>
        {nav_options.map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            // @ts-ignore
            onPress={() => navigation.navigate(option.screen)}
            style={tw`${
              route.name === option.screen ? "bg-green-700 " : " "
            } px-2 py-3 rounded-lg flex-1`}
          >
            <Text
              style={tw`${
                route.name === option.screen ? "text-white " : "text-slate-700 "
              } text-xl font-semibold text-center`}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
