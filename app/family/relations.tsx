import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { FamilyMember } from "@/types/family";
import { familyMembers, findRelationship } from "@/utils/familyUtils";

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
    <View style={styles.container}>
      <LinearGradient colors={["#121212", "#000000"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Relations Finder</ThemedText>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.searchContainer}
        >
          <ThemedText style={styles.sectionTitle}>Select Two People</ThemedText>

          {/* Person 1 Search */}
          <View style={styles.searchSection}>
            <ThemedText style={styles.searchLabel}>Person 1:</ThemedText>
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
                        Father: {member.father} • Mother: {member.mother}
                      </ThemedText>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Person 2 Search */}
          <View style={styles.searchSection}>
            <ThemedText style={styles.searchLabel}>Person 2:</ThemedText>
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
                        Father: {member.father} • Mother: {member.mother}
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
              style={[styles.button, styles.findButton]}
              onPress={findRelation}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#0095f6", "#007bb5"]}
                style={styles.buttonGradient}
              >
                <Ionicons name="search" size={24} color="#FFFFFF" />
                <ThemedText style={styles.buttonText}>
                  Find Relationship
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearSearch}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#262626", "#121212"]}
                style={styles.buttonGradient}
              >
                <Ionicons name="refresh" size={24} color="#FFFFFF" />
                <ThemedText style={[styles.buttonText, styles.clearButtonText]}>
                  Clear
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Relationship Result */}
        {relationship && (
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.resultContainer}
          >
            <ThemedText style={styles.resultTitle}>
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

        {/* Selected People Display */}
        {(selectedPerson1 || selectedPerson2) && (
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.selectedContainer}
          >
            <ThemedText style={styles.selectedTitle}>
              Selected People
            </ThemedText>
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
  searchContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  searchSection: {
    marginBottom: 16,
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FFFFFF",
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
    backgroundColor: "#262626",
    borderRadius: 8,
  },
  resultItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 8,
  },
  button: {
    flex: 0.48,
    borderRadius: 8,
  },
  findButton: {
    backgroundColor: "#0095f6",
  },
  clearButton: {
    backgroundColor: "#262626",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
  clearButtonText: {
    color: "#FFFFFF",
  },
  resultContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resultTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  relationshipCard: {
    borderRadius: 8,
    padding: 12,
  },
  relationshipText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#FFFFFF",
  },
  pathContainer: {
    marginTop: 8,
  },
  pathTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#FFFFFF",
  },
  pathText: {
    fontSize: 12,
    color: "#B0B0B0",
  },
  selectedContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  selectedTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
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
  resultGradient: {
    borderRadius: 8,
    padding: 12,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedPersonGradient: {
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
