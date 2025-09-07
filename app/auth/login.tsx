import { Ionicons } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { auth } from "@/firebaseConfig";
import { globalStyles } from "../styles/globalStyles";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in successfully!");
      }
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LinearGradient
          colors={["#121212", "#000000"]}
          style={globalStyles.header}
        >
          <View style={globalStyles.headerContent}>
            <View style={globalStyles.iconWrapper}>
              <Ionicons name="people" size={28} color="#0095f6" />
            </View>
            <ThemedText style={styles.headerTitle}>Family Tree App</ThemedText>
            <ThemedText style={globalStyles.headerSubtitle}>
              {isSignUp ? "Create your account" : "Welcome back"}
            </ThemedText>
          </View>
        </LinearGradient>

        <ScrollView
          style={globalStyles.content}
          contentContainerStyle={globalStyles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.formContainer}
          >
            <ThemedText style={styles.formTitle}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </ThemedText>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail"
                size={24}
                color="#0095f6"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#B0B0B0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed"
                size={24}
                color="#0095f6"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#B0B0B0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuth}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#0095f6", "#007bb5"]}
                style={styles.buttonGradient}
              >
                <Ionicons
                  name={isSignUp ? "person-add" : "log-in"}
                  size={24}
                  color="#FFFFFF"
                  style={styles.buttonIcon}
                />
                <ThemedText style={styles.buttonText}>
                  {isLoading
                    ? "Please wait..."
                    : isSignUp
                    ? "Create Account"
                    : "Sign In"}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsSignUp(!isSignUp)}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.switchText}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </ThemedText>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#262626", "#121212"]}
            style={styles.featuresContainer}
          >
            <ThemedText style={styles.featuresTitle}>App Features</ThemedText>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="git-network" size={20} color="#0095f6" />
                <ThemedText style={styles.featureText}>
                  Family Tree View
                </ThemedText>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="search" size={20} color="#0095f6" />
                <ThemedText style={styles.featureText}>
                  Search Members
                </ThemedText>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people" size={20} color="#0095f6" />
                <ThemedText style={styles.featureText}>
                  Relations Finder
                </ThemedText>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="location" size={20} color="#0095f6" />
                <ThemedText style={styles.featureText}>
                  Village Directory
                </ThemedText>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  formContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
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
  authButton: {
    borderRadius: 8,
    marginTop: 8,
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
  switchButton: {
    marginTop: 12,
    paddingVertical: 12,
  },
  switchText: {
    fontSize: 14,
    color: "#0095f6",
    textAlign: "center",
    fontWeight: "500",
  },
  featuresContainer: {
    borderRadius: 12,
    padding: 16,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#FFFFFF",
  },
  featureList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 8,
    color: "#B0B0B0",
  },
});
