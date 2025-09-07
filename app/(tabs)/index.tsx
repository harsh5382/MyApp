import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { auth } from "@/firebaseConfig";
import { familyMembers } from "@/utils/familyUtils";
import { globalStyles } from "../styles/globalStyles";

export default function HomeScreen() {
  const router = useRouter();
  const totalMembers = familyMembers?.length || 0;

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  const menuItems = [
    {
      title: "Family Tree",
      subtitle: "Explore family connections",
      icon: "git-network-outline" as const,
      route: "/family/tree",
      gradient: ["#262626", "#121212"] as const,
      iconBg: "#0095f6",
    },
    {
      title: "Search Members",
      subtitle: "Find family members quickly",
      icon: "search-outline" as const,
      route: "/family/search",
      gradient: ["#262626", "#121212"] as const,
      iconBg: "#0095f6",
    },
    {
      title: "Relations Finder",
      subtitle: "Discover how you're related",
      icon: "people-outline" as const,
      route: "/family/relations",
      gradient: ["#262626", "#121212"] as const,
      iconBg: "#0095f6",
    },
    {
      title: "Villages",
      subtitle: "Browse by location",
      icon: "location-outline" as const,
      route: "/family/villages",
      gradient: ["#262626", "#121212"] as const,
      iconBg: "#0095f6",
    },
    {
      title: "Add Member",
      subtitle: "Add new family member",
      icon: "person-add-outline" as const,
      route: "/family/add-member",
      gradient: ["#262626", "#121212"] as const,
      iconBg: "#0095f6",
    },
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <LinearGradient
        colors={["#121212", "#000000"]}
        style={globalStyles.header}
      >
        <View style={styles.headerLeftPlaceholder} />
        <View style={globalStyles.headerContent}>
          <View style={globalStyles.iconWrapper}>
            <Ionicons name="people" size={28} color="#0095f6" />
          </View>
          <ThemedText style={globalStyles.headerTitle}>Family Tree</ThemedText>
          <ThemedText style={globalStyles.headerSubtitle}>
            {totalMembers} family members
          </ThemedText>
        </View>
        <TouchableOpacity
          style={globalStyles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={globalStyles.content}
        contentContainerStyle={globalStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.gradient}
                style={styles.menuItemGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.menuItemContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: item.iconBg },
                    ]}
                  >
                    <Ionicons name={item.icon} size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <ThemedText style={styles.menuTitle}>
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.menuSubtitle}>
                      {item.subtitle}
                    </ThemedText>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#0095f6" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.statsContainer}
        >
          <ThemedText style={styles.statsTitle}>Family Statistics</ThemedText>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>{totalMembers}</ThemedText>
              <ThemedText style={styles.statLabel}>Total Members</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {familyMembers?.filter(
                  (m) =>
                    (m.sons?.length || 0) > 0 || (m.daughters?.length || 0) > 0
                )?.length || 0}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Parents</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {familyMembers?.filter((m) => (m.sons?.length || 0) > 0)
                  ?.length || 0}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Sons</ThemedText>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerLeftPlaceholder: {
    width: 40, // Matches logoutButton size for symmetry
  },
  menuContainer: {
    marginVertical: 16,
  },
  menuItem: {
    marginBottom: 8,
    borderRadius: 8,
  },
  menuItemGradient: {
    borderRadius: 8,
    padding: 12,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  statsContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#FFFFFF",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0095f6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#B0B0B0",
    textAlign: "center",
  },
});
