import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type Props = {};

const LightComponent = (props: Props) => {
  const navigation = useNavigation();
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
        p{/* {value} */}
      </Text>
      <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
      <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
    </TouchableOpacity>
  );
};

export default LightComponent;

const styles = StyleSheet.create({});
