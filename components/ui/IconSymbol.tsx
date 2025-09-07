import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface IconSymbolProps {
  name: string;
  size: number;
  color: string;
  style?: any;
}

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  return (
    <Ionicons 
      name={name as any} 
      size={size} 
      color={color} 
      style={style}
    />
  );
}
