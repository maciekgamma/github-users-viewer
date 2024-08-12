import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
  },
});

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSubmit: () => void;
};

const SearchBar = (props: SearchBarProps) => {
  const clearButtonClass = props.value.length > 0 ? "visible" : "invisible";

  return (
    <View className="flex-row items-center px-4 py-3 bg-gray-200 rounded-3xl">
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        className="color-gray-600"
      />
      <TextInput
        placeholder="GitHub username"
        className="flex-1 ml-2 text-lg text-black placeholder:text-gray-400"
        onChange={(e) => props.onChange(e.nativeEvent.text)}
        value={props.value}
        returnKeyType="search"
        onSubmitEditing={props.onSubmit}
      />
      <TouchableOpacity
        onPress={props.onClear}
        className={`${clearButtonClass}`}
        testID="clear-button"
      >
        <MaterialCommunityIcons
          name="close-circle-outline"
          size={24}
          className="color-primary"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
