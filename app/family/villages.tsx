import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { familyMembers, getAllVillages } from "@/utils/familyUtils";

export default function VillagesScreen() {
  const router = useRouter();
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);
  const villages = getAllVillages();

  const getMembersFromVillage = (village: string) => {
    return familyMembers.filter(
      (member) =>
        member.mosal.gam === village ||
        member.sasru.gam === village ||
        member.daughters.some((daughter) => daughter.village === village)
    );
  };

  const navigateToProfile = (memberName: string) => {
    router.push({
      pathname: "/family/profile",
      params: { memberName: memberName },
    });
  };

  const getVillageType = (member: any, village: string) => {
    if (member.mosal.gam === village) return "Mosal (Maternal)";
    if (member.sasru.gam === village) return "Sasru (Paternal)";
    if (member.daughters.some((d: any) => d.village === village))
      return "Daughter Village";
    return "Unknown";
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#121212", "#000000"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Villages</ThemedText>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.statsContainer}
        >
          <Ionicons name="location" size={32} color="#0095f6" />
          <ThemedText style={styles.statsText}>
            {villages.length} villages in our family
          </ThemedText>
        </LinearGradient>

        {villages.map((village, index) => {
          const members = getMembersFromVillage(village);
          const isExpanded = selectedVillage === village;

          return (
            <View key={index} style={styles.villageCard}>
              <TouchableOpacity
                style={styles.villageHeader}
                onPress={() => setSelectedVillage(isExpanded ? null : village)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#262626", "#121212"]}
                  style={styles.villageGradient}
                >
                  <View style={styles.villageInfo}>
                    <ThemedText style={styles.villageName}>
                      {village}
                    </ThemedText>
                    <ThemedText style={styles.memberCount}>
                      {members.length} family member
                      {members.length !== 1 ? "s" : ""}
                    </ThemedText>
                  </View>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#0095f6"
                  />
                </LinearGradient>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.membersList}>
                  {members.map((member, memberIndex) => (
                    <TouchableOpacity
                      key={memberIndex}
                      style={styles.memberItem}
                      onPress={() => navigateToProfile(member.name)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={["#262626", "#121212"]}
                        style={styles.memberGradient}
                      >
                        <View style={styles.memberInfo}>
                          <ThemedText style={styles.memberName}>
                            {member.name}
                          </ThemedText>
                          <ThemedText style={styles.villageType}>
                            {getVillageType(member, village)}
                          </ThemedText>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#0095f6"
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#262626",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    color: "#FFFFFF",
  },
  villageCard: {
    borderRadius: 8,
    marginBottom: 8,
  },
  villageHeader: {
    borderRadius: 8,
  },
  villageGradient: {
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  villageInfo: {
    flex: 1,
  },
  villageName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#FFFFFF",
  },
  memberCount: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  membersList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  memberItem: {
    borderRadius: 8,
    marginBottom: 8,
  },
  memberGradient: {
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#FFFFFF",
  },
  villageType: {
    fontSize: 14,
    color: "#B0B0B0",
  },
});
