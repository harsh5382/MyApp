import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { FamilyMember } from "@/types/family";
import { familyMembers, findRelationship } from "@/utils/familyUtils";
import { globalStyles } from "../styles/globalStyles";

export default function RelationsScreen() {
  const router = useRouter();
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [searchResults1, setSearchResults1] = useState<FamilyMember[]>([]);
  const [searchResults2, setSearchResults2] = useState<FamilyMember[]>([]);
  const [selectedPerson1, setSelectedPerson1] = useState<FamilyMember | null>(
    null
  );
  const [selectedPerson2, setSelectedPerson2] = useState<FamilyMember | null>(
    null
  );
  const [relationship, setRelationship] = useState<any>(null);

  const searchMembers = (query: string) => {
    if (query.length < 2) return [];
    return familyMembers.filter((member) =>
      member.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handlePerson1Search = (query: string) => {
    setPerson1(query);
    if (query.length >= 2) {
      setSearchResults1(searchMembers(query));
    } else {
      setSearchResults1([]);
    }
  };

  const handlePerson2Search = (query: string) => {
    setPerson2(query);
    if (query.length >= 2) {
      setSearchResults2(searchMembers(query));
    } else {
      setSearchResults2([]);
    }
  };

  const selectPerson = (person: FamilyMember, isPerson1: boolean) => {
    if (isPerson1) {
      setSelectedPerson1(person);
      setPerson1(person.name);
      setSearchResults1([]);
    } else {
      setSelectedPerson2(person);
      setPerson2(person.name);
      setSearchResults2([]);
    }
  };

  const findRelation = () => {
    if (!selectedPerson1 || !selectedPerson2) {
      Alert.alert(
        "Error",
        "Please select both people to find their relationship"
      );
      return;
    }

    if (selectedPerson1.name === selectedPerson2.name) {
      Alert.alert("Error", "Please select two different people");
      return;
    }

    const relation = findRelationship(
      selectedPerson1.name,
      selectedPerson2.name
    );
    setRelationship(relation);
  };

  const clearSearch = () => {
    setPerson1("");
    setPerson2("");
    setSearchResults1([]);
    setSearchResults2([]);
    setSelectedPerson1(null);
    setSelectedPerson2(null);
    setRelationship(null);
  };

  const navigateToProfile = (memberName: string) => {
    router.push({
      pathname: "./profile",
      params: { memberName: memberName },
    });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
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
        <View style={globalStyles.headerContent}>
          <View style={globalStyles.iconWrapper}>
            <Ionicons name="people" size={28} color="#0095f6" />
          </View>
          <ThemedText style={globalStyles.headerTitle}>
            Relations Finder
          </ThemedText>
          <ThemedText style={globalStyles.headerSubtitle}>
            Find how people are related
          </ThemedText>
        </View>
        <View style={globalStyles.placeholder} />
      </LinearGradient>

      <ScrollView
        style={globalStyles.content}
        contentContainerStyle={globalStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.sectionContainer}
        >
          <ThemedText style={styles.sectionTitle}>Select Two People</ThemedText>

          {/* Person 1 Search */}
          <View style={styles.searchSection}>
            <ThemedText style={styles.searchLabel}>Person 1</ThemedText>
            <View style={styles.searchInputContainer}>
              <Ionicons
                name="person"
                size={24}
                color="#0095f6"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for first person..."
                placeholderTextColor="#B0B0B0"
                value={person1}
                onChangeText={handlePerson1Search}
                autoCapitalize="none"
              />
            </View>
            {searchResults1.length > 0 && (
              <View style={styles.resultsList}>
                {searchResults1.map((member, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.resultItem}
                    onPress={() => selectPerson(member, true)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={["#262626", "#121212"]}
                      style={styles.resultGradient}
                    >
                      <ThemedText style={styles.resultName}>
                        {member.name}
                      </ThemedText>
                      <ThemedText style={styles.resultInfo}>
                        Father: {member.father || "Unknown"} • Mother:{" "}
                        {member.mother || "Unknown"}
                      </ThemedText>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Person 2 Search */}
          <View style={styles.searchSection}>
            <ThemedText style={styles.searchLabel}>Person 2</ThemedText>
            <View style={styles.searchInputContainer}>
              <Ionicons
                name="person"
                size={24}
                color="#0095f6"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for second person..."
                placeholderTextColor="#B0B0B0"
                value={person2}
                onChangeText={handlePerson2Search}
                autoCapitalize="none"
              />
            </View>
            {searchResults2.length > 0 && (
              <View style={styles.resultsList}>
                {searchResults2.map((member, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.resultItem}
                    onPress={() => selectPerson(member, false)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={["#262626", "#121212"]}
                      style={styles.resultGradient}
                    >
                      <ThemedText style={styles.resultName}>
                        {member.name}
                      </ThemedText>
                      <ThemedText style={styles.resultInfo}>
                        Father: {member.father || "Unknown"} • Mother:{" "}
                        {member.mother || "Unknown"}
                      </ThemedText>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[globalStyles.actionButton, styles.buttonSpacing]}
              onPress={findRelation}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#0095f6", "#007bb5"]}
                style={globalStyles.buttonGradient}
              >
                <Ionicons name="search" size={24} color="#FFFFFF" />
                <ThemedText style={globalStyles.buttonText}>
                  Find Relationship
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.actionButton}
              onPress={clearSearch}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#0095f6", "#007bb5"]}
                style={globalStyles.buttonGradient}
              >
                <Ionicons name="refresh" size={24} color="#FFFFFF" />
                <ThemedText style={globalStyles.buttonText}>Clear</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Selected People Display */}
        {(selectedPerson1 || selectedPerson2) && (
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.sectionContainer}
          >
            <ThemedText style={styles.sectionTitle}>Selected People</ThemedText>
            {selectedPerson1 && (
              <TouchableOpacity
                style={styles.selectedPerson}
                onPress={() => navigateToProfile(selectedPerson1.name)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#262626", "#121212"]}
                  style={styles.selectedPersonGradient}
                >
                  <ThemedText style={styles.selectedName}>
                    1. {selectedPerson1.name}
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={20} color="#0095f6" />
                </LinearGradient>
              </TouchableOpacity>
            )}
            {selectedPerson2 && (
              <TouchableOpacity
                style={styles.selectedPerson}
                onPress={() => navigateToProfile(selectedPerson2.name)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#262626", "#121212"]}
                  style={styles.selectedPersonGradient}
                >
                  <ThemedText style={styles.selectedName}>
                    2. {selectedPerson2.name}
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={20} color="#0095f6" />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        )}

        {/* Relationship Result */}
        {relationship && (
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.sectionContainer}
          >
            <ThemedText style={styles.sectionTitle}>
              Relationship Found
            </ThemedText>
            <LinearGradient
              colors={["#262626", "#121212"]}
              style={styles.relationshipCard}
            >
              <ThemedText style={styles.relationshipText}>
                {relationship.relationship}
              </ThemedText>
              {relationship.path.length > 0 && (
                <View style={styles.pathContainer}>
                  <ThemedText style={styles.pathTitle}>
                    Connection Path:
                  </ThemedText>
                  <ThemedText style={styles.pathText}>
                    {relationship.path.join(" → ")}
                  </ThemedText>
                </View>
              )}
            </LinearGradient>
          </LinearGradient>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  searchSection: {
    marginBottom: 24,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  resultsList: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#262626",
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  resultGradient: {
    borderRadius: 8,
    padding: 12,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  resultInfo: {
    fontSize: 12,
    color: "#B0B0B0",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 16,
  },
  buttonSpacing: {
    marginBottom: 12,
  },
  selectedPerson: {
    marginBottom: 8,
  },
  selectedName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  selectedPersonGradient: {
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  relationshipCard: {
    borderRadius: 8,
    padding: 16,
  },
  relationshipText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  pathContainer: {
    marginTop: 8,
  },
  pathTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  pathText: {
    fontSize: 12,
    color: "#B0B0B0",
  },
});
