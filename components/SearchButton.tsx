import React from "react";
import { TouchableOpacity, Text } from "react-native";

type SearchButtonProps = {
  onPress: () => void;
  isHidden?: boolean;
};

const SearchButton = (props: SearchButtonProps) => {
  const visibility = props.isHidden ? "hidden" : "visible ";

  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={`w-full px-4 py-3  rounded-xl visible bg-primary ${visibility}`}
    >
      <Text className="text-xl text-center text-white ">Search</Text>
    </TouchableOpacity>
  );
};

export default SearchButton;
