import { useReposByUser, GitHubRepository } from "@/queries/useReposByUser";
import { View, Text } from "react-native";

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
    return <Text>Loading repositories...</Text>;
  }

  return (
    <View className="w-full px-2">
      {query.data?.map((repo) => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </View>
  );
};
