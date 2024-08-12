import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useSearch } from "../contexts/SearchContext";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

export interface GitHubSearchResult {
  items: GitHubUser[];
  total_count: number;
}

export const searchGitHubUsers = async (
  query: string
): Promise<GitHubUser[]> => {
  try {
    // Make a GET request to the GitHub search API for users
    const response = await axios.get<GitHubSearchResult>(
      `https://api.github.com/search/users`,
      {
        params: {
          q: query, // Query string to search users
          per_page: 5, // Number of results per page
        },
      }
    );

    // Extract user data from the response
    const users: GitHubUser[] = response.data.items;

    // Return the list of users
    return users;
  } catch (error) {
    throw error; // Rethrow to be handled by the calling function
  }
};
export const useUserSearchResults = () => {
  const { searchValue } = useSearch();

  return useQuery({
    queryKey: ["users", searchValue],
    queryFn: () => searchGitHubUsers(searchValue),
    enabled: searchValue.length > 0,
  });
};
