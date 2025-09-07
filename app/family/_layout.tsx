import { Stack } from "expo-router";

export default function FamilyLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#121212" },
      }}
    >
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="tree" options={{ title: "Family Tree" }} />
      <Stack.Screen name="search" options={{ title: "Search Family" }} />
      <Stack.Screen name="relations" options={{ title: "Relations Finder" }} />
      <Stack.Screen name="villages" options={{ title: "Villages" }} />
      <Stack.Screen name="add-member" options={{ title: "Add Member" }} />
      <Stack.Screen name="edit-member" options={{ title: "Edit Member" }} />
    </Stack>
  );
}
