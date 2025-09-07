import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { FamilyTreeNode } from "@/types/family";
import { buildFamilyTree, familyMembers } from "@/utils/familyUtils";

export default function FamilyTreeScreen() {
  const router = useRouter();
  const [treeData, setTreeData] = useState<FamilyTreeNode[]>(() =>
    buildFamilyTree()
  );

  const toggleExpanded = (node: FamilyTreeNode) => {
    const updateNode = (nodes: FamilyTreeNode[]): FamilyTreeNode[] => {
      return nodes.map((n) => {
        if (n.name === node.name) {
          return { ...n, isExpanded: !n.isExpanded };
        }
        if (n.children.length > 0) {
          return { ...n, children: updateNode(n.children) };
        }
        return n;
      });
    };
    setTreeData(updateNode(treeData));
  };

  const navigateToProfile = (memberName: string) => {
    const member = familyMembers.find((m) => m.name === memberName);
    if (member) {
      router.push({
        pathname: "/family/profile",
        params: { memberName: memberName },
      });
    }
  };

  const renderTreeNode = (node: FamilyTreeNode, level: number = 0) => {
    const hasChildren = node.children.length > 0;
    const isExpanded = node.isExpanded;

    return (
      <View key={node.name} style={styles.nodeContainer}>
        <TouchableOpacity
          style={[
            styles.nodeItem,
            { marginLeft: level * 20 },
            hasChildren && styles.parentNode,
          ]}
          onPress={() => {
            if (hasChildren) {
              toggleExpanded(node);
            } else {
              navigateToProfile(node.name);
            }
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              hasChildren ? ["#0095f6", "#007bb5"] : ["#262626", "#121212"]
            }
            style={styles.nodeGradient}
          >
            <View style={styles.nodeContent}>
              <View style={styles.nodeInfo}>
                <ThemedText
                  style={[styles.nodeName, hasChildren && styles.parentName]}
                >
                  {node.name}
                </ThemedText>
                {node.village && (
                  <ThemedText style={styles.villageText}>
                    📍 {node.village}
                  </ThemedText>
                )}
              </View>
              {hasChildren && (
                <Ionicons
                  name={isExpanded ? "chevron-down" : "chevron-forward"}
                  size={24}
                  color="#FFFFFF"
                />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {hasChildren && isExpanded && (
          <View style={styles.childrenContainer}>
            {node.children.map((child) => renderTreeNode(child, level + 1))}
          </View>
        )}
      </View>
    );
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
        <ThemedText style={styles.headerTitle}>Family Tree</ThemedText>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView
        style={styles.treeContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.statsContainer}
        >
          <Ionicons name="people" size={32} color="#0095f6" />
          <ThemedText style={styles.statsText}>
            {familyMembers.length} family members
          </ThemedText>
        </LinearGradient>

        {treeData.map((node) => renderTreeNode(node))}
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
  treeContainer: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
  },
  nodeContainer: {
    marginBottom: 8,
  },
  nodeItem: {
    borderRadius: 8,
    marginBottom: 4,
  },
  parentNode: {},
  nodeGradient: {
    borderRadius: 8,
    padding: 12,
  },
  nodeContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  nodeInfo: {
    flex: 1,
  },
  nodeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#FFFFFF",
  },
  parentName: {
    fontWeight: "600",
    color: "#FFFFFF",
    fontSize: 18,
  },
  villageText: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  childrenContainer: {
    marginTop: 8,
  },
});
