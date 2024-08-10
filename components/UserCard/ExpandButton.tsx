import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

cssInterop(MaterialIcons, {
  className: {
    target: "style",
  },
});

type ExpandButtonProps = {
  isExpanded: boolean;
  onPress: () => void;
};

export const ExpandButton = (props: ExpandButtonProps) => {
  const icon = props.isExpanded ? "expand-less" : "expand-more";
  return (
    <Pressable className="items-center justify-center" onPress={props.onPress}>
      <MaterialIcons name={icon} className="text-4xl text-gray-700" />
    </Pressable>
  );
};
