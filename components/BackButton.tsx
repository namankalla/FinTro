import { TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { colors } from "@/constants/theme";

const BackButton = ({ iconSize = 24, color = colors.text, style = {} }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={style}>
      <ArrowLeft size={iconSize} color={color} weight="bold" />
    </TouchableOpacity>
  );
};

export default BackButton;
