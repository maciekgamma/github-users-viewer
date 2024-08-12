// Import necessary libraries and modules
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the SearchContext provider
import { SearchProvider } from "@/contexts/SearchContext";

// Import global styles
import "../global.css";

// Initialize a QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Do not refetch data on window focus
    },
  },
});

// Root layout component
export default function RootLayout() {
  return (
    // Provide the QueryClient to the app using QueryClientProvider
    <QueryClientProvider client={queryClient}>
      {/* Provide the SearchContext to the app */}
      <SearchProvider>
        {/* Define a stack navigator with screen options */}
        <Stack
          screenOptions={{
            headerShown: false, // Disable headers for screens
            animation: "none", // Disable screen transition animations
          }}
        >
          {/* Define the "index" screen in the stack navigator */}
          <Stack.Screen name="index" />
        </Stack>
      </SearchProvider>
    </QueryClientProvider>
  );
}
