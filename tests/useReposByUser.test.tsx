// useReposByUser.test.ts
import { renderHook } from "@testing-library/react-hooks";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  useReposByUser,
  fetchPublicRepositories,
  GitHubRepository,
} from "../queries/useReposByUser";
import React from "react";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useReposByUser", () => {
  const mock = new MockAdapter(axios);

  const mockRepos: GitHubRepository[] = [
    {
      id: 1,
      name: "repo1",
      full_name: "octocat/repo1",
      description: "First repository",
      html_url: "https://github.com/octocat/repo1",
      language: "TypeScript",
      forks_count: 10,
      stargazers_count: 50,
      watchers_count: 25,
    },
    {
      id: 2,
      name: "repo2",
      full_name: "octocat/repo2",
      description: "Second repository",
      html_url: "https://github.com/octocat/repo2",
      language: "JavaScript",
      forks_count: 5,
      stargazers_count: 20,
      watchers_count: 15,
    },
  ];

  afterEach(() => {
    mock.reset();
  });

  it("should return repositories for a user on success", async () => {
    mock
      .onGet("https://api.github.com/users/octocat/repos", {
        params: { type: "public", sort: "updated", per_page: 100, page: 1 },
      })
      .reply(200, mockRepos);

    const { result, waitFor } = renderHook(() => useReposByUser("octocat"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.pages[0]).toEqual(mockRepos);
  });

  it("should handle errors correctly", async () => {
    mock
      .onGet("https://api.github.com/users/octocat/repos", {
        params: { type: "public", sort: "updated", per_page: 100, page: 1 },
      })
      .reply(404);

    const { result, waitFor } = renderHook(() => useReposByUser("octocat"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
