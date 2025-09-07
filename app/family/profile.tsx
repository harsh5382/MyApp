import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { FamilyMember } from "@/types/family";
import { familyMembers } from "@/utils/familyUtils";
import { globalStyles } from "../styles/globalStyles";

export default function ProfileScreen() {
  const router = useRouter();
  const { memberName } = useLocalSearchParams();

  const member: FamilyMember | undefined = familyMembers.find(
    (m) => m.name === memberName
  );

  if (!member) {
    return (
      <View style={globalStyles.container}>
        <LinearGradient
          colors={["#121212", "#000000"]}
          style={globalStyles.header}
        >
          <TouchableOpacity
            style={globalStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <ThemedText style={globalStyles.headerTitle}>
            Member Not Found
          </ThemedText>
          <View style={globalStyles.placeholder} />
        </LinearGradient>
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={globalStyles.errorContainer}
        >
          <Ionicons name="person-outline" size={60} color="#0095f6" />
          <ThemedText style={globalStyles.errorText}>
            Member not found in family tree.
          </ThemedText>
        </LinearGradient>
      </View>
    );
  }

  const renderVillageInfo = (title: string, village: any) => (
    <LinearGradient
      colors={["#262626", "#121212"]}
      style={globalStyles.infoCard}
    >
      <ThemedText style={globalStyles.cardTitle}>{title}</ThemedText>
      <ThemedText style={globalStyles.infoText}>
        <ThemedText style={globalStyles.label}>Gam:</ThemedText>{" "}
        {village?.gam || "Unknown"}
      </ThemedText>
      <ThemedText style={globalStyles.infoText}>
        <ThemedText style={globalStyles.label}>Sakh:</ThemedText>{" "}
        {village?.sakh || "Unknown"}
      </ThemedText>
      {village?.extra && (
        <ThemedText style={globalStyles.infoText}>
          <ThemedText style={globalStyles.label}>Extra:</ThemedText>{" "}
          {village.extra}
        </ThemedText>
      )}
    </LinearGradient>
  );

  const renderChildren = (children: any[], title: string) => {
    if (!children || children.length === 0) return null;

    return (
      <LinearGradient
        colors={["#262626", "#121212"]}
        style={globalStyles.infoCard}
      >
        <ThemedText style={globalStyles.cardTitle}>
          {title} ({children.length})
        </ThemedText>
        {children.map((child, index) => (
          <TouchableOpacity
            key={index}
            style={globalStyles.childItem}
            onPress={() => {
              const childMember = familyMembers.find(
                (m) => m.name === child?.name
              );
              if (childMember) {
                router.push({
                  pathname: "./profile",
                  params: { memberName: child.name },
                });
              }
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#262626", "#121212"]}
              style={globalStyles.childGradient}
            >
              <ThemedText style={globalStyles.childName}>
                {child?.name || "Unknown"}
              </ThemedText>
              {child?.village && (
                <ThemedText style={globalStyles.childVillage}>
                  📍 {child.village}
                </ThemedText>
              )}
              <Ionicons name="chevron-forward" size={20} color="#0095f6" />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    );
  };

  return (
    <View style={globalStyles.container}>
      <LinearGradient
        colors={["#121212", "#000000"]}
        style={globalStyles.header}
      >
        <TouchableOpacity
          style={globalStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={globalStyles.headerTitle}>Profile</ThemedText>
        <View style={globalStyles.placeholder} />
      </LinearGradient>

      <ScrollView
        style={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={globalStyles.profileCard}
        >
          <TouchableOpacity
            style={globalStyles.editButton}
            onPress={() =>
              router.push({
                pathname: "./edit-member",
                params: {
                  memberId: "temp-id",
                  memberData: JSON.stringify(member),
                },
              })
            }
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={20} color="#0095f6" />
          </TouchableOpacity>
          <View style={globalStyles.avatarContainer}>
            <Ionicons name="person" size={80} color="#0095f6" />
          </View>
          <ThemedText style={globalStyles.memberName}>
            {member.name || "Unknown"}
          </ThemedText>
        </LinearGradient>

        <LinearGradient
          colors={["#262626", "#121212"]}
          style={globalStyles.infoCard}
        >
          <ThemedText style={globalStyles.cardTitle}>
            Family Information
          </ThemedText>
          <ThemedText style={globalStyles.infoText}>
            <ThemedText style={globalStyles.label}>Father:</ThemedText>{" "}
            {member.father || "Unknown"}
          </ThemedText>
          <ThemedText style={globalStyles.infoText}>
            <ThemedText style={globalStyles.label}>Mother:</ThemedText>{" "}
            {member.mother || "Unknown"}
          </ThemedText>
          {member.wife && (
            <ThemedText style={globalStyles.infoText}>
              <ThemedText style={globalStyles.label}>Wife:</ThemedText>{" "}
              {member.wife}
            </ThemedText>
          )}
        </LinearGradient>

        {renderChildren(member.sons, "Sons")}
        {renderChildren(member.daughters, "Daughters")}

        {renderVillageInfo("Mosal (Maternal)", member.mosal)}
        {renderVillageInfo("Sasru (Paternal)", member.sasru)}
      </ScrollView>
    </View>
  );
}
