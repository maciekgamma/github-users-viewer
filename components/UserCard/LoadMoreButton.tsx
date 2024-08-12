import { Text, Pressable } from "react-native";

type LoadMoreButtonProps = {
  onPress: () => void;
};

export const LoadMoreButton = (props: LoadMoreButtonProps) => {
  return (
    <Pressable
      className="flex-row items-center justify-center h-10 bg-gray-100"
      onPress={props.onPress}
    >
      <Text className="text-primary">Load More</Text>
    </Pressable>
  );
};
