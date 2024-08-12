import { Text, Pressable, View } from "react-native";

type LoadMoreButtonProps = {
  onPress: () => void;
  isLoading: boolean;
};

export const LoadMoreButton = (props: LoadMoreButtonProps) => {
  if (props.isLoading) {
    return (
      <View className="flex-row items-center justify-center h-10 bg-gray-100">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <Pressable
      className="flex-row items-center justify-center h-10 bg-gray-100"
      onPress={props.onPress}
    >
      <Text className="text-primary">Load More</Text>
    </Pressable>
  );
};
