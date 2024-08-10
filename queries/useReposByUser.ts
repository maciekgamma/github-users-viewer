import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  username: string
): Promise<GitHubRepository[]> => {
  try {
    // Make a GET request to the GitHub API for the user's repositories
    const response = await axios.get<GitHubRepository[]>(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          type: "public", // Only public repositories
          sort: "updated", // Sort by the most recently updated
          per_page: 100, // Adjust the number of repositories per page if needed
        },
      }
    );

    // Extract repository data from the response
    const repositories: GitHubRepository[] = response.data;

    // Return the list of repositories
    return repositories;
  } catch (error) {
    console.error(`Error fetching repositories for user ${username}: ${error}`);
    // Handle the error appropriately
    return [];
  }
};

export const useReposByUser = (username: string) => {
  return useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchPublicRepositories(username),
  });
};
