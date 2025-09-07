import { Stack } from "expo-router";

export default function FamilyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable default navigation header
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="tree" />
      <Stack.Screen name="search" />
      <Stack.Screen name="relations" />
      <Stack.Screen name="villages" />
      <Stack.Screen name="add-member" />
    </Stack>
  );
}
