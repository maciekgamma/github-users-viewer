import React from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

cssInterop(FontAwesome, {
  className: {
    target: "style",
  },
});

type HeaderProps = {
  small?: boolean;
  onPress?: () => void;
};

const Header = (props: HeaderProps) => {
  const textSize = props.small ? "text-lg" : "text-4xl";
  const iconSize = props.small ? "text-2xl" : "text-8xl";
  const paddingTop = props.small ? "pt-5" : "pt-40";
  const headerLocation = props.small
    ? "items-start justify-start"
    : "items-center justify-center";

  return (
    <Pressable
      className={`flex-row ${headerLocation} px-10 ${paddingTop} transition-all `}
      onPress={props.onPress}
    >
      <FontAwesome name="github" className={`${iconSize} color-black`} />
      <View className="items-center h-full text-center ">
        <Text
          className={`ml-2 ${textSize} font-bold text-center text-black transition-all px-2 text-bo`}
        >
          GitHub User Browser
        </Text>
      </View>
    </Pressable>
  );
};

export default Header;
