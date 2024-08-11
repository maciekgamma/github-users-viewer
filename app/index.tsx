import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";
import SearchButton from "@/components/SearchButton";
import { View, Text } from "react-native";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { useSearch } from "@/contexts/SearchContext";
import { BottomTip } from "@/components/BottomTip";
import { SearchResults } from "@/components/SearchResults";

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
        {searchValue.length > 0 ? <SearchResults /> : <BottomTip />}
      </View>
    </SafeAreaView>
  );
}
