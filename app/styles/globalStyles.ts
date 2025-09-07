import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 40, // Reduced to avoid excessive space, relying on SafeAreaView
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#262626",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#262626",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#B0B0B0",
    textAlign: "center",
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 80, // Ensure footer is fully visible
  },
  profileCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  editButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#262626",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  memberName: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  infoText: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  label: {
    fontWeight: "600",
    color: "#0095f6",
  },
  childItem: {
    borderRadius: 8,
    marginBottom: 8,
  },
  childGradient: {
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  childName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  childVillage: {
    fontSize: 14,
    color: "#B0B0B0",
    marginRight: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    borderRadius: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
