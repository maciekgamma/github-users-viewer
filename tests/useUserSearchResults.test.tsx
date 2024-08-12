// useUserSearchResults.test.tsx
import { renderHook } from "@testing-library/react-hooks";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  useUserSearchResults,
  searchGitHubUsers,
  GitHubUser,
} from "../queries/useUserSearchResults";
import { useSearch } from "../contexts/SearchContext";
import React from "react";

jest.mock("../contexts/SearchContext");

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

describe("useUserSearchResults", () => {
  const mock = new MockAdapter(axios);

  const mockUsers: GitHubUser[] = [
    {
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      url: "https://github.com/octocat",
    },
    {
      login: "doe",
      id: 2,
      avatar_url: "https://github.com/images/error/doe_happy.gif",
      url: "https://github.com/doe",
    },
  ];

  afterEach(() => {
    mock.reset();
  });

  it("should return search results for a query", async () => {
    (useSearch as jest.Mock).mockReturnValue({ searchValue: "octocat" });

    mock
      .onGet("https://api.github.com/search/users", {
        params: { q: "octocat", per_page: 5 },
      })
      .reply(200, { items: mockUsers, total_count: 2 });

    const { result, waitFor } = renderHook(() => useUserSearchResults(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockUsers);
  });

  it("should not fetch when search value is empty", async () => {
    (useSearch as jest.Mock).mockReturnValue({ searchValue: "" });

    const { result } = renderHook(() => useUserSearchResults(), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBeFalsy();
  });

  it("should handle errors correctly", async () => {
    (useSearch as jest.Mock).mockReturnValue({ searchValue: "octocat" });

    mock
      .onGet("https://api.github.com/search/users", {
        params: { q: "octocat", per_page: 5 },
      })
      .reply(404);

    const { result, waitFor } = renderHook(() => useUserSearchResults(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
