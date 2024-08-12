import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  useDetailedUserInfo,
  DetailedGitHubUser,
} from "../queries/useDetailedUserInfo";
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

describe("useDetailedUserInfo", () => {
  const mock = new MockAdapter(axios);
  const mockUserDetails: DetailedGitHubUser = {
    login: "octocat",
    public_repos: 2,
    name: "The Octocat",
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    url: "https://api.github.com/users/octocat",
    id: 1,
  };

  afterEach(() => {
    mock.reset();
  });

  it("should return user details on success", async () => {
    mock
      .onGet("https://api.github.com/users/octocat")
      .reply(200, mockUserDetails);

    const { result, waitFor } = renderHook(
      () => useDetailedUserInfo("octocat"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => result.current.isSuccess, { timeout: 10000 });

    expect(result.current.data).toEqual(mockUserDetails);
  });

  it("should handle error correctly", async () => {
    mock.onGet("https://api.github.com/users/octocat").reply(404);

    const { result, waitFor } = renderHook(
      () => useDetailedUserInfo("octocat"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
