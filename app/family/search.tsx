import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { SearchResult } from "@/types/family";
import { searchFamilyMembers } from "@/utils/familyUtils";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = searchFamilyMembers(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const navigateToProfile = (memberName: string) => {
    router.push({
      pathname: "/family/profile",
      params: { memberName: memberName },
    });
  };

  const getMatchTypeIcon = (matchType: string) => {
    switch (matchType) {
      case "name":
        return "person";
      case "village":
        return "location";
      case "relation":
        return "people";
      default:
        return "search";
    }
  };

  const getMatchTypeColor = (matchType: string) => {
    switch (matchType) {
      case "name":
        return "#0095f6";
      case "village":
        return "#00B7EB";
      case "relation":
        return "#40C4FF";
      default:
        return "#B0B0B0";
    }
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
        <ThemedText style={styles.headerTitle}>Search Family</ThemedText>
        <View style={styles.placeholder} />
      </LinearGradient>

      <LinearGradient
        colors={["#262626", "#121212"]}
        style={styles.searchContainer}
      >
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={24}
            color="#0095f6"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, village, or relation..."
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              <Ionicons name="close-circle" size={24} color="#0095f6" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        {searchQuery.length === 0 && (
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.emptyState}
          >
            <Ionicons name="search" size={80} color="#0095f6" />
            <ThemedText style={styles.emptyText}>
              Start typing to search family members
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Search by name, village, or family relation
            </ThemedText>
          </LinearGradient>
        )}

        {searchQuery.length > 0 && searchResults.length === 0 && (
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.emptyState}
          >
            <Ionicons name="search-outline" size={80} color="#0095f6" />
            <ThemedText style={styles.emptyText}>
              No results found for &quot;{searchQuery}&quot;
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Try searching with different keywords
            </ThemedText>
          </LinearGradient>
        )}

        {searchResults.map((result, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resultItem}
            onPress={() => navigateToProfile(result.member.name)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#262626", "#121212"]}
              style={styles.resultGradient}
            >
              <View style={styles.resultContent}>
                <View style={styles.resultInfo}>
                  <ThemedText style={styles.memberName}>
                    {result.member.name}
                  </ThemedText>
                  <View style={styles.matchInfo}>
                    <Ionicons
                      name={getMatchTypeIcon(result.matchType)}
                      size={16}
                      color={getMatchTypeColor(result.matchType)}
                      style={styles.matchIcon}
                    />
                    <ThemedText style={styles.matchText}>
                      {result.matchText}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.familyInfo}>
                    Father: {result.member.father} • Mother:{" "}
                    {result.member.mother}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#0095f6" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    padding: 16,
    borderRadius: 12,
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
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#B0B0B0",
    marginTop: 8,
    textAlign: "center",
  },
  resultItem: {
    borderRadius: 8,
    marginBottom: 8,
  },
  resultGradient: {
    borderRadius: 8,
    padding: 12,
  },
  resultContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#FFFFFF",
  },
  matchInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  matchIcon: {
    marginRight: 8,
  },
  matchText: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  familyInfo: {
    fontSize: 14,
    color: "#B0B0B0",
  },
});
