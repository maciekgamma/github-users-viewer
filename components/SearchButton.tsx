import React from "react";
import { TouchableOpacity, Text, Keyboard } from "react-native";

type SearchButtonProps = {
  onPress: () => void;
  isHidden?: boolean;
};

const SearchButton = (props: SearchButtonProps) => {
  const visibility = props.isHidden ? "hidden" : "visible ";

  const handlePress = () => {
    Keyboard.dismiss();
    props.onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`w-full px-4 py-3  rounded-xl visible bg-primary ${visibility}`}
    >
      <Text className="text-xl text-center text-white ">Search</Text>
    </TouchableOpacity>
  );
};

export default SearchButton;
