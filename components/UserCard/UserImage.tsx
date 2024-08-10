import { Image, View } from "react-native";

import { GitHubUser } from "@/queries/useUserSearchResults";

type UserImageProps = {
  user: GitHubUser;
};

export const UserImage = (props: UserImageProps) => {
  return (
    <View className="pt-1 pr-3 my-auto">
      <Image
        source={{ uri: props.user.avatar_url }}
        className="items-center justify-center w-12 h-12 rounded-full"
      />
    </View>
  );
};
