import { useReposByUser, GitHubRepository } from "@/queries/useReposByUser";
import { View, Text, FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { MaterialIcons } from "@expo/vector-icons";

type RepoProps = {
  repo: GitHubRepository;
};

const Repo = (props: RepoProps) => {
  return (
    <View className="flex-row w-full p-2 my-1 bg-gray-100 border-2 border-gray-200 shadow-md rounded-xl">
      <View className="flex-col flex-1">
        <Text>{props.repo.name}</Text>
        <Text className="text-sm text-gray-500 max-w-1" numberOfLines={1}>
          {props.repo.description}
        </Text>
      </View>
      <View className="flex-row">
        <MaterialIcons name="star" className="text-lg text-gray-500" />
        <Text className="text-sm text-gray-500">
          {props.repo.stargazers_count}
        </Text>
      </View>
    </View>
  );
};

type ReposListProps = {
  username: string;
};

export const ReposList = (props: ReposListProps) => {
  const query = useReposByUser(props.username);

  if (query.isLoading) {
    return <Text className="text-gray-500">Loading repositories...</Text>;
  }

  if (query.isError) {
    return <Text>Error: {query.error.message}</Text>;
  }

  if (!query.data || query.data.length === 0) {
    return (
      <Text className="text-gray-500">
        No public repositories found for this user
      </Text>
    );
  }

  return (
    <FlashList
      data={query.data}
      renderItem={({ item }) => <Repo repo={item} />}
      estimatedItemSize={40}
      nestedScrollEnabled={true}
    />
  );
};
