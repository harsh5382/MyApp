import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Haptics } from 'expo-haptics';
import { Pressable } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      {...props}
      onPress={async (ev) => {
        if (props.onPress) {
          try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } catch (error) {
            // Haptic feedback failed, continue without it
            console.log('Haptic feedback not available');
          }
          props.onPress(ev);
        }
      }}
    />
  );
}
