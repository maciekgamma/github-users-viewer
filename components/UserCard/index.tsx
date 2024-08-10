import { useDetailedUserInfo } from "@/queries/useDetailedUserInfo";
import { GitHubUser } from "@/queries/useUserSearchResults";
import { View, Text, Image } from "react-native";
import { UserInfo } from "./UserInfo";
import { UserImage } from "./UserImage";
import { ReposCount } from "./ReposCount";
import { ExpandButton } from "./ExpandButton";

type UserCardProps = {
  user: GitHubUser;
};

export const UserCard = (props: UserCardProps) => {
  const detailedQuery = useDetailedUserInfo(props.user.login);

  return (
    <View className="flex-row items-center w-full px-4 py-2 my-1 bg-gray-100 border-2 border-gray-200 shadow-xl rounded-xl">
      <View className="flex-row items-center flex-1">
        <UserImage user={props.user} />
        <UserInfo
          user={props.user}
          userDetails={detailedQuery.data}
          isLoading={detailedQuery.isLoading}
        />
      </View>
      <View className="flex-row items-center flex-shrink-0">
        <ReposCount count={detailedQuery.data?.public_repos} />
        <ExpandButton isExpanded={false} onPress={() => {}} />
      </View>
    </View>
  );
};
