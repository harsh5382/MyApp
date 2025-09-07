import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0095f6",
        tabBarInactiveTintColor: "#B0B0B0",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "#333333",
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 6,
          height: 54,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          color: "#FFFFFF",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Family App",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="people" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
