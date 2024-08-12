import { FlatList, Text, View } from "react-native";

import { useUserSearchResults } from "@/queries/useUserSearchResults";
import { UserCard } from "./UserCard";
import { FlashList } from "@shopify/flash-list";
import { useSearch } from "@/contexts/SearchContext";

const Result = () => {
  const query = useUserSearchResults();
  const { searchValue } = useSearch();

  if (query.isLoading) {
    return <Text className="text-gray-500">Loading...</Text>;
  }

  if (query.isError) {
    return <Text className="text-red-500">Error: {query.error.message}</Text>;
  }

  if (query.data?.length === 0 || !query.data) {
    return (
      <Text className="text-gray-500">
        No results found for "{searchValue}"
      </Text>
    );
  }

  return (
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
  );
};

export const SearchResults = () => {
  return (
    <View className="flex-1 w-full ">
      <Result />
    </View>
  );
};
