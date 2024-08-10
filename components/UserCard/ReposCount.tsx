import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

cssInterop(MaterialIcons, {
  className: {
    target: "style",
  },
});

type ReposCountProps = {
  count: number | undefined;
};

export const ReposCount = (props: ReposCountProps) => {
  if (props.count === undefined) {
    return null;
  }
  return (
    <View className="flex-row items-center h-full gap-1 pr-2">
      <MaterialIcons name="folder-copy" className="text-lg text-gray-500 " />
      <Text className="text-gray-500 text-regular">{props.count}</Text>
    </View>
  );
};
