import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import GeneralLayout from "../layouts/GeneralLayout";
import CurrentWeather from "../components/current-weather/CurrentWeather";
import TempComponent from "../components/home-components/TempComponent";
import HumidityComponent from "../components/home-components/HumidityComponent";
import HomeHeader from "../components/navigation/HomeHeader";
import LightComponent from "../components/home-components/LightComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "../context/Store";

type Props = {};

const HomeScreen = (props: Props) => {
  const [ip_address, setIpAddress] = useState<any>();
  const { state } = useContext(Store);
  const { ip_address: context_ip_address } = state;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("module_ip");
      // @ts-ignore
      setIpAddress(JSON.parse(ip_address)).ip_address;
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, [ip_address]);
  console.log("ip_address:L ", context_ip_address);

  return (
    <GeneralLayout>
      <View style={tw`h-full pb-8`}>
        <ScrollView contentContainerStyle={tw``}>
          <StatusBar style="auto" />
          <HomeHeader />
          <CurrentWeather />
          <Text style={tw`text-2xl text-center text-zinc-900 py-8`}>
            Properties
          </Text>
          <TempComponent />
          {/* <HumidityComponent /> */}
          {/* <LightComponent /> */}
        </ScrollView>
      </View>
    </GeneralLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
