import { FlatList, Text, View } from "react-native";

import { useUserSearchResults } from "@/queries/useUserSearchResults";
import { UserCard } from "./UserCard";
import { FlashList } from "@shopify/flash-list";
import { useSearch } from "@/contexts/SearchContext";

export const SearchResults = () => {
  const query = useUserSearchResults();

  const { searchValue } = useSearch();

  return (
    <View className="flex-1 w-full ">
      {query.isLoading ? (
        <Text>Loading...</Text>
      ) : query.isError ? (
        <Text>Error: {query.error.message}</Text>
      ) : (
        <View className="flex-1 w-full ">
          <Text className="pb-1 pl-2 text-gray-500">
            Results for "{searchValue}":
          </Text>
          <FlashList
            data={query.data}
            renderItem={({ item }) => <UserCard user={item} />}
            scrollEnabled={true}
            className="w-full"
            nestedScrollEnabled={true}
            estimatedItemSize={60}
          />
        </View>
      )}
    </View>
  );
};
