import { View, Text } from "react-native";

import { DetailedGitHubUser } from "@/queries/useDetailedUserInfo";
import { GitHubUser } from "@/queries/useUserSearchResults";

type UserInfoProps = {
  user: GitHubUser;
  userDetails?: DetailedGitHubUser;
  isLoading: boolean;
};

export const UserInfo = (props: UserInfoProps) => {
  return (
    <View className="flex-col">
      <Text className="text-lg">{props.user.login}</Text>
      <Text className="text-gray-500">{props.userDetails?.name}</Text>
    </View>
  );
};
