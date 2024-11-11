import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@ui-kitten/components";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              fill={color}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "alert-triangle" : "alert-triangle-outline"}
              fill={color}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
