import React from "react";
import { ReactNode } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import tw from "twrnc";
import CustomHeader from "../components/navigation/CustomHeader";

type Props = {
  children?: ReactNode;
};

const GeneralLayout = ({ children }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <CustomHeader />
      </View>
      <ScrollView style={[tw`flex-1 bg-zinc-100 h-full py-4 px-4`]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneralLayout;
