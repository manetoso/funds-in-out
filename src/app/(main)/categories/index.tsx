import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { FAB, IconButton, List, Searchbar, Text } from "react-native-paper";

import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { ScreenLoader, Switch } from "@/src/common/components";
import { router } from "expo-router";
import { useCategoryStore } from "@/src/stores";

export default function CategoriesScreen() {
  const {
    data: categories,
    isError: isErrorCategories,
    isFetching: isLoadingCategories,
  } = useFetchCategories();
  const { setCurrentCategory } = useCategoryStore();
  const [searchQuery, setSearchQuery] = useState("");
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
    const filteredData = categories.filter(category => {
      return category.name.toLowerCase().includes(formattedQuery);
    });
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
      <Searchbar placeholder="Search" mode="view" onChangeText={handleSearch} value={searchQuery} />
      <Text variant="labelSmall">Select an option or create one</Text>
      <View style={[styles.flexGrow1, styles.pB140]}>
        <Switch>
          <Switch.Case condition={isLoadingCategories}>
            <ScreenLoader />
          </Switch.Case>
          <Switch.Case condition={isErrorCategories || typeof categories === "undefined"}>
            <Text>Failed to load categories, try again later.</Text>
          </Switch.Case>
          <Switch.Default>
            <List.Section>
              <FlatList
                data={filteredCategories}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <List.Item
                    title={item.name}
                    left={props => (
                      <List.Icon
                        {...props}
                        color={typeof item.color === "string" ? item.color : "transparent"}
                        icon="circle"
                      />
                    )}
                    right={() => (
                      <IconButton
                        icon="dots-horizontal"
                        size={20}
                        onPress={() => {
                          router.navigate(
                            `/(main)/categories/details?queryId=${item.id}&queryName=${item.name}&queryColor=%23${item.color?.substring(1)}`,
                          );
                        }}
                      />
                    )}
                    onPress={() => {
                      setCurrentCategory(item.name);
                      router.back();
                    }}
                  />
                )}
              />
            </List.Section>
          </Switch.Default>
        </Switch>
      </View>

      {!isLoadingCategories && !isErrorCategories && typeof categories !== "undefined" && (
        <FAB icon="plus" size="small" style={styles.fab} onPress={handleFABPress} />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  padding32: {
    padding: 32,
  },
  pB140: {
    paddingBottom: 140,
  },
  gap16: {
    gap: 16,
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
