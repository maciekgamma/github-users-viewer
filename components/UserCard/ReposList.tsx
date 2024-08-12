import { useReposByUser, GitHubRepository } from "@/queries/useReposByUser";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { MaterialIcons } from "@expo/vector-icons";

import { LoadMoreButton } from "@/components/UserCard/LoadMoreButton";
import { useMemo } from "react";

type RepoProps = {
  repo: GitHubRepository;
};

const Repo = (props: RepoProps) => {
  return (
    <View className="flex-row w-[98%] p-2 mx-1 my-1 bg-gray-100 border-2 border-gray-200 shadow-md rounded-xl">
      <View className="flex-col flex-1">
        <Text>{props.repo.name}</Text>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {props.repo.description}
        </Text>
      </View>
      <View className="flex-row">
        <MaterialIcons name="star" className="pr-1 text-lg text-gray-500" />
        <Text className="text-gray-500 text-md pt-0.5">
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

  const repos = useMemo(() => query.data?.pages.flat(), [query.data]);

  if (query.isLoading) {
    return <Text className="text-gray-500">Loading repositories...</Text>;
  }

  if (query.isError) {
    return <Text className="text-red-500">Error: {query.error.message}</Text>;
  }

  if (repos?.length === 0) {
    return (
      <Text className="text-gray-500">
        No public repositories found for this user
      </Text>
    );
  }

  const onLoadMore = () => {
    query.fetchNextPage();
  };

  return (
    <View className="w-full">
      <FlashList
        data={repos}
        renderItem={({ item }) => <Repo repo={item} />}
        estimatedItemSize={65}
        nestedScrollEnabled={true}
        className="border-l-2 border-primary"
      />
      {query.hasNextPage && (
        <LoadMoreButton
          onPress={onLoadMore}
          isLoading={query.isLoading || query.isFetchingNextPage}
        />
      )}
    </View>
  );
};
