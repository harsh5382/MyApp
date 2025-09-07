import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ParallaxScrollViewProps = ScrollViewProps & {
  headerBackgroundColor?: { light: string; dark: string };
  headerImage?: React.ReactElement;
};

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  ...otherProps
}: ParallaxScrollViewProps) {
  const backgroundColor = useThemeColor(headerBackgroundColor, 'background');

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    >
      <View style={[styles.header, { backgroundColor }]}>
        {headerImage}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
