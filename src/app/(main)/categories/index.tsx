import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Layout, List, Text } from "@ui-kitten/components";

import { useCategoryStore } from "@/src/stores";
import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { CategoryListItem } from "@/src/features/categories/components";
import { FAB, ScreenMessage, ScreenSpinner, SearchInput, Switch } from "@/src/common/components";

export default function CategoriesScreen() {
  const { setCurrentCategory } = useCategoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: categories,
    isError: isErrorCategories,
    isFetching: isLoadingCategories,
  } = useFetchCategories();
  const [filteredCategories, setFilteredCategories] = useState<
    {
      id: number;
      name: string;
      color: string | null;
    }[]
  >(categories ?? []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (isLoadingCategories || isErrorCategories || typeof categories === "undefined") return;
    if (query === "") return setFilteredCategories(categories);

    const formattedQuery = query.toLowerCase();
    const filteredData = categories.filter(category =>
      category.name.toLowerCase().includes(formattedQuery),
    );
    setFilteredCategories(filteredData);
  };

  const handleFABPress = () => {
    router.navigate("/(main)/categories/details?queryId=0");
  };

  useEffect(() => {
    if (categories) {
      setFilteredCategories(categories);
    }
  }, [categories]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.flex1]}>
      <Layout level="1" style={{ flex: 1, padding: 24, gap: 16 }}>
        <SearchInput
          handleSearch={handleSearch}
          isLoading={isLoadingCategories || isErrorCategories || typeof categories === "undefined"}
          value={searchQuery}
        />
        <Text category="label">Select an option or create one</Text>
        <Switch>
          <Switch.Case condition={isLoadingCategories}>
            <ScreenSpinner />
          </Switch.Case>
          <Switch.Case condition={isErrorCategories || typeof categories === "undefined"}>
            <ScreenMessage message="Failed to load categories, try again later." />
          </Switch.Case>
          <Switch.Default>
            <View style={[styles.flex1, { paddingBottom: 24 }]}>
              <List
                contentContainerStyle={{ gap: 8 }}
                data={filteredCategories}
                renderItem={({ item }) => (
                  <CategoryListItem
                    item={{
                      id: item.id,
                      name: item.name,
                      color: item.color ?? "#fff",
                    }}
                    setCurrentCategory={setCurrentCategory}
                  />
                )}
                style={{ borderRadius: 16 }}
                snapToInterval={65.5 + 8}
              />
            </View>
          </Switch.Default>
        </Switch>

        {!isLoadingCategories && !isErrorCategories && typeof categories !== "undefined" && (
          <FAB onPress={handleFABPress} />
        )}
      </Layout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
