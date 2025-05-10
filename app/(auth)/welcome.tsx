import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router"; 

const Welcome = () => {
  const router = useRouter(); 
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login Button & Image */}
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/login")} 
          >
            <Typo fontWeight={"500"}>Sign in</Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(1000)}
            source={require("@/assets/images/maybeicon.jpg")} 
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo size={15} fontWeight={"800"}>Always take control</Typo>
            <Typo size={15} fontWeight={"800"}>of your finances</Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            style={{ alignItems: "center", gap: 2 }}
          >
            <Typo size={17} color={colors.textLight}>
              Finances must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in future
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => router.push("/(auth)/register")}>  
              <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._40,
    justifyContent: "space-between",
  },
  loginButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
  },
  footer: {
    alignItems: "center",
    gap: verticalScale(15),
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    width: "100%",
  },
});
