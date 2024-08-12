// React and React Native imports
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

// Context and custom hook imports
import { useSearch } from "@/contexts/SearchContext";

// Component imports
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SearchButton from "@/components/SearchButton";
import { SearchResults } from "@/components/SearchResults";
import { BottomTip } from "@/components/BottomTip";

export default function Index() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const { searchValue, setSearchValue } = useSearch();

  const onHeaderPress = () => {
    setSearchValue("");
    setSearchBarValue("");
  };

  return (
    <SafeAreaView>
      <View className="flex w-full h-full gap-3 px-2">
        <Header small={searchValue.length > 0} onPress={onHeaderPress} />
        <SearchBar
          value={searchBarValue}
          onChange={setSearchBarValue}
          onClear={() => setSearchBarValue("")}
          onSubmit={() => setSearchValue(searchBarValue)}
        />
        <SearchButton
          onPress={() => setSearchValue(searchBarValue)}
          isHidden={searchValue.length > 0}
        />
        {/* Show the results if there is a search value else show the tip */}
        {searchValue.length > 0 ? <SearchResults /> : <BottomTip />}
      </View>
    </SafeAreaView>
  );
}
