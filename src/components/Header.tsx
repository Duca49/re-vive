import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = { onMenuPress: () => void };

export default function Header({ onMenuPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton} hitSlop={10}>
        <Ionicons name="menu" size={26} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>ReVive</Text>
      <View style={styles.logoCircle}>
        <Ionicons name="leaf" size={18} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconButton: { padding: 4 },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});