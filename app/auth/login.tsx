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
      router.replace("/tabs/index" as any); // Temporary cast to bypass TS error
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
            <ThemedText style={globalStyles.headerTitle}>
              Family Tree App
            </ThemedText>
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
  formContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
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
    marginBottom: 16,
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
    alignItems: "center",
  },
  switchText: {
    fontSize: 14,
    color: "#0095f6",
  },
  featuresContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  featureList: {
    alignItems: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
