import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  // Add more fields if necessary
}

export interface GitHubUserReposResponse {
  data: GitHubRepository[];
}

/**
 * Fetch all public repositories for a given GitHub user
 * @param username - GitHub username
 * @returns Promise<GitHubRepository[]>
 */
export const fetchPublicRepositories = async (
  username: string,
  page: number = 1
): Promise<GitHubRepository[]> => {
  try {
    // Make a GET request to the GitHub API for the user's repositories
    const response = await axios.get<GitHubRepository[]>(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          type: "public", // Only public repositories
          sort: "updated", // Sort by the most recently updated
          per_page: 100, // Number of repositories per page
          page, // Specify the page number
        },
      }
    );

    // Extract repository data from the response
    const repositories: GitHubRepository[] = response.data;

    // Return the list of repositories
    return repositories;
  } catch (error) {
    // Handle the error appropriately
    throw error; // Rethrow to be handled by the calling function
  }
};

export const useReposByUser = (username: string) => {
  return useInfiniteQuery({
    queryKey: ["repos", username],
    queryFn: ({ pageParam = 1 }) =>
      fetchPublicRepositories(username, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has less than 100 items, we've reached the end
      return lastPage.length < 100 ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
