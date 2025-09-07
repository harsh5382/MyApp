import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      {...(props as any)} // spread props safely
      onPress={async (ev) => {
        try {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch {
          console.log("Haptic feedback not available");
        }
        props.onPress?.(ev);
      }}
    >
      {props.children}
    </Pressable>
  );
}
