import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX } from "@/constants/theme";

interface InputProps extends TextInputProps {
  icon?: JSX.Element;
  containerStyle?: object;
  inputStyle?: object;
  inputRef?: React.RefObject<TextInput>;
}

const Input = (props: InputProps) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.icon && <View>{props.icon}</View>}
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 17,
    paddingHorizontal: spacingX._15, 
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
});
