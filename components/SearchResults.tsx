import { Text, View } from "react-native";

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
          <View>
            {query.data?.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
