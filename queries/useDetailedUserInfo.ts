import axios from "axios";
import { GitHubUser } from "./useUserSearchResults";
import { useQuery } from "@tanstack/react-query";

export interface DetailedGitHubUser extends GitHubUser {
  name?: string; // Full name of the user
  public_repos: number; // Number of public repositories
}

const fetchUserDetails = async (
  username: string
): Promise<DetailedGitHubUser> => {
  try {
    console.log(`Fetching details for user: ${username}`);
    const response = await axios.get<DetailedGitHubUser>(
      `https://api.github.com/users/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for user ${username}: ${error}`);
    throw error; // Rethrow to be handled by the calling function
  }
};

export const useDetailedUserInfo = (username: string) => {
  return useQuery<DetailedGitHubUser, Error>({
    queryKey: ["userDetails", username],
    queryFn: () => fetchUserDetails(username),
    enabled: username.length > 0, // Only fetch if there is a username
  });
};
