import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import BackButton from "@/components/BackButton";
import { colors } from "@/constants/theme";

const Login = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <Typo size={30} fontWeight={"800"}>Login Page</Typo>
        <Typo size={20} color={colors.textLighter}>Coming Soon...</Typo>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
