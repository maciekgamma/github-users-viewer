import { Stack } from "expo-router";

import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "@/contexts/SearchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </SearchProvider>
    </QueryClientProvider>
  );
}
