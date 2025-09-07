import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { db } from "@/firebaseConfig";
import { FamilyMember } from "@/types/family";

export default function AddMemberScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState<Partial<FamilyMember>>({
    name: "",
    father: "",
    mother: "",
    wife: "",
    sons: [],
    daughters: [],
    mosal: { gam: "", sakh: "", extra: "" },
    sasru: { gam: "", sakh: "", extra: "" },
  });

  const handleInputChange = (field: string, value: string) => {
    setMemberData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVillageChange = (
    villageType: "mosal" | "sasru",
    field: string,
    value: string
  ) => {
    setMemberData((prev) => ({
      ...prev,
      [villageType]: {
        ...prev[villageType]!,
        [field]: value,
      },
    }));
  };

  const addChild = (type: "sons" | "daughters") => {
    const newChild = { name: "", village: "" };
    setMemberData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), newChild],
    }));
  };

  const updateChild = (
    type: "sons" | "daughters",
    index: number,
    field: string,
    value: string
  ) => {
    setMemberData((prev) => ({
      ...prev,
      [type]:
        prev[type]?.map((child, i) =>
          i === index ? { ...child, [field]: value } : child
        ) || [],
    }));
  };

  const removeChild = (type: "sons" | "daughters", index: number) => {
    setMemberData((prev) => ({
      ...prev,
      [type]: prev[type]?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSave = async () => {
    if (!memberData.name?.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, "familyMembers"), {
        ...memberData,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Family member added successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChildInputs = (type: "sons" | "daughters", title: string) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addChild(type)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {memberData[type]?.map((child, index) => (
        <View key={index} style={styles.childInputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={`${title.slice(0, -1)} name`}
                placeholderTextColor="#B0B0B0"
                value={child.name}
                onChangeText={(value) =>
                  updateChild(type, index, "name", value)
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Village"
                placeholderTextColor="#B0B0B0"
                value={child.village}
                onChangeText={(value) =>
                  updateChild(type, index, "village", value)
                }
              />
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeChild(type, index)}
              activeOpacity={0.8}
            >
              <Ionicons name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={["#121212", "#000000"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Add Family Member</ThemedText>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.formContainer}
        >
          <ThemedText style={styles.formTitle}>Basic Information</ThemedText>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Full Name *"
              placeholderTextColor="#B0B0B0"
              value={memberData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="man"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Father's Name"
              placeholderTextColor="#B0B0B0"
              value={memberData.father}
              onChangeText={(value) => handleInputChange("father", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="woman"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Mother's Name"
              placeholderTextColor="#B0B0B0"
              value={memberData.mother}
              onChangeText={(value) => handleInputChange("mother", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="heart"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Spouse Name"
              placeholderTextColor="#B0B0B0"
              value={memberData.wife}
              onChangeText={(value) => handleInputChange("wife", value)}
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.formContainer}
        >
          <ThemedText style={styles.formTitle}>
            Mosal (Maternal) Village
          </ThemedText>

          <View style={styles.inputContainer}>
            <Ionicons
              name="location"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Gam"
              placeholderTextColor="#B0B0B0"
              value={memberData.mosal?.gam}
              onChangeText={(value) =>
                handleVillageChange("mosal", "gam", value)
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="business"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Sakh"
              placeholderTextColor="#B0B0B0"
              value={memberData.mosal?.sakh}
              onChangeText={(value) =>
                handleVillageChange("mosal", "sakh", value)
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="information-circle"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Extra Information"
              placeholderTextColor="#B0B0B0"
              value={memberData.mosal?.extra}
              onChangeText={(value) =>
                handleVillageChange("mosal", "extra", value)
              }
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#262626", "#121212"]}
          style={styles.formContainer}
        >
          <ThemedText style={styles.formTitle}>
            Sasru (Paternal) Village
          </ThemedText>

          <View style={styles.inputContainer}>
            <Ionicons
              name="location"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Gam"
              placeholderTextColor="#B0B0B0"
              value={memberData.sasru?.gam}
              onChangeText={(value) =>
                handleVillageChange("sasru", "gam", value)
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="business"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Sakh"
              placeholderTextColor="#B0B0B0"
              value={memberData.sasru?.sakh}
              onChangeText={(value) =>
                handleVillageChange("sasru", "sakh", value)
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="information-circle"
              size={24}
              color="#0095f6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Extra Information"
              placeholderTextColor="#B0B0B0"
              value={memberData.sasru?.extra}
              onChangeText={(value) =>
                handleVillageChange("sasru", "extra", value)
              }
            />
          </View>
        </LinearGradient>

        {renderChildInputs("sons", "Sons")}
        {renderChildInputs("daughters", "Daughters")}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#0095f6", "#007bb5"]}
            style={styles.buttonGradient}
          >
            <Ionicons
              name="save"
              size={24}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <ThemedText style={styles.buttonText}>
              {isLoading ? "Saving..." : "Save Member"}
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  formContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#0095f6",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  childInputContainer: {
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  removeButton: {
    padding: 8,
  },
  saveButton: {
    borderRadius: 8,
    marginTop: 16,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
