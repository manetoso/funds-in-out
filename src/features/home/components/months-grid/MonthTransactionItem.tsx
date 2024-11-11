import { Pressable, View } from "react-native";
import { Href, router } from "expo-router";
import { format } from "date-fns";
import { Text } from "@ui-kitten/components";

import { formatCurrency, getContrastColor } from "@/src/common/utils";
import { TransactionRecord } from "@/src/api/resources/transactions/types/types";

export type MonthTransactionItemProps = TransactionRecord;

export const MonthTransactionItem = ({
  amount,
  category_color,
  category_name,
  date,
  description,
  id,
  type,
}: MonthTransactionItemProps) => {
  const handleEditTransaction = () => {
    const URL =
      `/(main)/transactions/${id}?queryAmount=${amount}&queryCategory=${category_name ?? ""}&queryDate=${date?.split("T")[0]}&queryDescription=${description}&queryType=${type}` as Href<string>;
    router.push(URL);
  };

  return (
    <Pressable
      key={id}
      onPress={handleEditTransaction}
      style={({ pressed }) => ({
        borderRadius: 16,
        borderColor: "#ececec",
        borderWidth: 1,
        width: "100%",
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        alignItems: "center",
        backgroundColor: pressed ? "#f0f0f0" : "white",
      })}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 8, flex: 3 }}>
        <View
          style={{
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flex: 1,
            ...(category_color && { backgroundColor: category_color }),
          }}>
          <Text
            numberOfLines={2}
            category="p2"
            style={{
              textAlign: "center",
              color: getContrastColor(category_color ?? "#000"),
            }}>
            {category_name ?? "-"}
          </Text>
        </View>
        <View style={{ justifyContent: "space-evenly", flex: 3 }}>
          <Text category="s1" numberOfLines={1}>
            {description ?? "-"}
          </Text>
          <Text category="c1" numberOfLines={1}>
            {format(date ?? "", "MMM dd,yyyy")}
          </Text>
        </View>
      </View>
      <Text category="s1" numberOfLines={1} style={{ textAlign: "right", flex: 1 }}>
        {formatCurrency(amount ?? 0)}
      </Text>
    </Pressable>
  );
};
