import { useDetailedUserInfo } from "@/queries/useDetailedUserInfo";
import { GitHubUser } from "@/queries/useUserSearchResults";
import { View, Text, Image } from "react-native";
import { UserInfo } from "./UserInfo";
import { UserImage } from "./UserImage";
import { ReposCount } from "./ReposCount";
import { ExpandButton } from "./ExpandButton";
import { CollapsableContainer } from "./CollapsableContainer";
import { memo, useState } from "react";
import { ReposList } from "./ReposList";
import { FlatList } from "react-native";

type UserCardProps = {
  user: GitHubUser;
};

export const UserCard = (props: UserCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const detailedQuery = useDetailedUserInfo(props.user.login);

  const MemoizedReposList = memo(() => (
    <ReposList username={props.user.login} />
  ));

  return (
    <View className={`w-full  pb-1 my-1 `}>
      <View className="flex-row items-center w-full bg-gray-100 border-2 border-gray-200 shadow-lg rounded-xl">
        <View className="flex-row items-center flex-1 pb-1 pl-1">
          <UserImage user={props.user} />
          <UserInfo
            user={props.user}
            userDetails={detailedQuery.data}
            isLoading={detailedQuery.isLoading}
          />
        </View>
        <View className="flex-row items-center flex-shrink-0">
          <ReposCount count={detailedQuery.data?.public_repos} />
          <ExpandButton
            isExpanded={isExpanded}
            onPress={() => setIsExpanded((prev) => !prev)}
          />
        </View>
      </View>
      <CollapsableContainer expanded={isExpanded}>
        <MemoizedReposList />
      </CollapsableContainer>
    </View>
  );
};
