import { FlatList, Text, View } from "react-native";

import { useUserSearchResults } from "@/queries/useUserSearchResults";
import { UserCard } from "./UserCard";
import { FlashList } from "@shopify/flash-list";

export const SearchResults = () => {
  const query = useUserSearchResults();

  return (
    <View className="flex-1 w-full ">
      {query.isLoading ? (
        <Text>Loading...</Text>
      ) : query.isError ? (
        <Text>Error: {query.error.message}</Text>
      ) : (
        <View className="flex-1 w-full ">
          <Text>Results:</Text>
          <FlashList
            data={query.data}
            renderItem={({ item }) => <UserCard user={item} />}
            scrollEnabled={true}
            className="w-full"
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};
