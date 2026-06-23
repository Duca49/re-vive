import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = { visible: boolean; onClose: () => void };

const ROLES = [
  { key: 'benefactor', label: 'Benefactor', sub: '(crea avisos)', icon: 'heart' as const },
  { key: 'beneficiario', label: 'Beneficiario', sub: '(recibe avisos)', icon: 'person' as const },
  { key: 'repartidor', label: 'Repartidor', sub: '(recoge y entrega lotes)', icon: 'bicycle' as const },
  { key: 'compostaje', label: 'Planta de Compostaje', sub: '(recibe desechos orgánicos)', icon: 'leaf' as const },
];

export default function SideMenu({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>ReVive</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {ROLES.map((role) => (
              <TouchableOpacity key={role.key} style={styles.card}>
                <Ionicons name={role.icon} size={28} color={COLORS.primary} />
                <Text style={styles.cardLabel}>{role.label}</Text>
                <Text style={styles.cardSub}>{role.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={onClose}>
            <Text style={styles.registerLabel}>REGISTRARSE</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start' },
  panel: { backgroundColor: '#FFFFFF', marginTop: 56, marginHorizontal: 16, borderRadius: 16, padding: 16 },
  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  panelTitle: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '47%', backgroundColor: COLORS.primaryLight, borderRadius: 12, paddingVertical: 18, alignItems: 'center', gap: 6 },
  cardLabel: { fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  cardSub: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center' },
  registerButton: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  registerLabel: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.5 },
});