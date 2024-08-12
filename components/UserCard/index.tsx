// React and hooks imports
import { memo, useState } from "react";

// React Native imports
import { View } from "react-native";

// Custom hooks and types imports
import { useDetailedUserInfo } from "@/queries/useDetailedUserInfo";
import { GitHubUser } from "@/queries/useUserSearchResults";

// Component imports
import { UserInfo } from "./UserInfo";
import { UserImage } from "./UserImage";
import { ReposCount } from "./ReposCount";
import { ExpandButton } from "./ExpandButton";
import { CollapsableContainer } from "./CollapsableContainer";
import { ReposList } from "./ReposList";

type UserCardProps = {
  user: GitHubUser;
};

export const UserCard = (props: UserCardProps) => {
  // State to manage the expanded/collapsed state of the card
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Fetch detailed user info using the custom hook
  const detailedQuery = useDetailedUserInfo(props.user.login);

  // Memoize the ReposList component to prevent unnecessary re-renders
  const MemoizedReposList = memo(() => (
    <ReposList username={props.user.login} />
  ));

  return (
    <View className="w-full pb-1 my-1">
      {/* Main user card container with user info and actions */}
      <View className="flex-row items-center w-full bg-gray-100 border-2 border-gray-200 shadow-lg rounded-xl">
        <View className="flex-row items-center flex-1 pb-1 pl-1">
          {/* User image and basic info */}
          <UserImage user={props.user} />
          <UserInfo
            user={props.user}
            userDetails={detailedQuery.data}
            isLoading={detailedQuery.isLoading}
          />
        </View>
        <View className="flex-row items-center flex-shrink-0">
          {/* Repos count and expand/collapse button */}
          <ReposCount count={detailedQuery.data?.public_repos} />
          <ExpandButton
            isExpanded={isExpanded}
            onPress={() => setIsExpanded((prev) => !prev)}
          />
        </View>
      </View>
      {/* Collapsable container that expands to show repos list */}
      <CollapsableContainer expanded={isExpanded}>
        <MemoizedReposList />
      </CollapsableContainer>
    </View>
  );
};
