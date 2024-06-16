import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import GeneralLayout from "../layouts/GeneralLayout";
import CurrentWeather from "../components/current-weather/CurrentWeather";
import TempComponent from "../components/home-components/TempComponent";
import HumidityComponent from "../components/home-components/HumidityComponent";
import HomeHeader from "../components/navigation/HomeHeader";
import LightComponent from "../components/home-components/LightComponent";

type Props = {};

const HomeScreen = (props: Props) => {
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
          <HumidityComponent />
          <LightComponent />
        </ScrollView>
      </View>
    </GeneralLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
