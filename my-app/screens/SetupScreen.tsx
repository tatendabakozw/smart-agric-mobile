import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import GeneralLayout from "../layouts/GeneralLayout";
import HomeHeader from "../components/navigation/HomeHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "../context/Store";

type Props = {};

const SetupScreen = (props: Props) => {
  const [module_ip, setModuleIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(Store);

  const storeUserPreference = async () => {
    try {
      setLoading(true);
      const ip_info = JSON.stringify({ ip_address: module_ip });
      dispatch({ type: "SETUP_IP", payload: ip_info });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error storing data", error);
    }
  };

  return (
    <GeneralLayout>
      <View style={tw`h-full`}>
        <ScrollView contentContainerStyle={tw``}>
          <StatusBar style="auto" />
          <HomeHeader />
          {/* weather info item on top of page */}

          <View
            style={tw`flex flex-col justify-between bg-white rounded-xl p-3 `}
          >
            <ScrollView contentContainerStyle={tw`py-4`}>
              <Text style={tw`text-slate-700 pb-1`}>IP Address:</Text>
              <TextInput
                style={tw`p-4 bg-slate-100 border border-slate-100 rounded-lg`}
                placeholder="Enter Module IP"
                onChangeText={setModuleIp}
                value={module_ip}
              />
              <TouchableOpacity
                onPress={
                  loading
                    ? () => console.log("loading...")
                    : storeUserPreference
                }
                style={tw`bg-green-700 rounded-lg p-4 my-4`}
              >
                <Text style={tw`text-white text-center text-lg`}>
                  {loading ? "loading..." : "Set IP"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </GeneralLayout>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({});
