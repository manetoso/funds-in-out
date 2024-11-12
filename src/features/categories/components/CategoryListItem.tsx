import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Button, Icon, Text } from "@ui-kitten/components";

import { Category } from "@/src/api/resources/categories/types/types";

type CategoryListItemProps = {
  item: Category;
  setCurrentCategory: (category: string) => void;
};

export const CategoryListItem = ({
  item: { color, id, name },
  setCurrentCategory,
}: CategoryListItemProps) => {
  return (
    <Pressable
      key={id}
      style={{
        borderRadius: 16,
        borderColor: "#ececec",
        borderWidth: 1,
        width: "100%",
        padding: 8,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
      onPress={() => {
        setCurrentCategory(name);
        router.back();
      }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: color ?? "transparent",
          }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <Text category="s1" numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          accessoryLeft={props => <Icon {...props} name="more-horizontal" />}
          appearance="ghost"
          onPress={() => {
            router.navigate(
              `/(main)/categories/details?queryId=${id}&queryName=${name}&queryColor=%23${color?.substring(1)}`,
            );
          }}
        />
      </View>
    </Pressable>
  );
};
