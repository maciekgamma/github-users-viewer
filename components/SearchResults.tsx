import { FlatList, Text, View } from "react-native";

import { useUserSearchResults } from "@/queries/useUserSearchResults";
import { UserCard } from "./UserCard";

export const SearchResults = () => {
  const query = useUserSearchResults();

  return (
    <View>
      {query.isLoading ? (
        <Text>Loading...</Text>
      ) : query.isError ? (
        <Text>Error: {query.error.message}</Text>
      ) : (
        <View>
          <Text>Results:</Text>
          <FlatList
            data={query.data}
            renderItem={({ item }) => <UserCard user={item} />}
          />
        </View>
      )}
    </View>
  );
};
