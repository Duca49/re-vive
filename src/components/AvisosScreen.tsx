import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { useAvisos } from '../context/AvisosContext';
import { Aviso } from '../types/aviso';
import AvisoFormModal from './AvisoFormModal';

const ESTADO_LABEL: Record<Aviso['estado'], string> = {
  activo: 'Activo',
  reclamado: 'Reclamado',
  retirado: 'Retirado',
  vencido: 'Vencido / Compost',
};

const ESTADO_COLOR: Record<Aviso['estado'], string> = {
  activo: COLORS.success,
  reclamado: COLORS.accent,
  retirado: COLORS.textMuted,
  vencido: COLORS.danger,
};

export default function AvisosScreen() {
  const { avisos, crearAviso, editarAviso, eliminarAviso, avanzarEstado } = useAvisos();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAviso, setEditingAviso] = useState<Aviso | null>(null);

  const openCreate = () => {
    setEditingAviso(null);
    setModalVisible(true);
  };

  const openEdit = (aviso: Aviso) => {
    setEditingAviso(aviso);
    setModalVisible(true);
  };

  const handleSave = (data: Omit<Aviso, 'id' | 'creadoEn' | 'estado'>) => {
    if (editingAviso) {
      editarAviso(editingAviso.id, data);
    } else {
      crearAviso(data);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <View style={[styles.badge, { backgroundColor: ESTADO_COLOR[item.estado] }]}>
                <Text style={styles.badgeText}>{ESTADO_LABEL[item.estado]}</Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>{item.descripcion}</Text>
            <Text style={styles.cardMeta}>
              {item.cantidadKg} kg · {item.esOrganicoCompostable ? 'Orgánico compostable' : 'No compostable'} · Ventana {item.ventanaRetiroHoras}h
            </Text>
            <Text style={styles.cardMeta}>Benefactor: {item.benefactorNombre}</Text>

            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => avanzarEstado(item.id)} style={styles.actionButton}>
                <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.primary} />
                <Text style={styles.actionLabel}>Avanzar estado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEdit(item)} style={styles.actionButton}>
                <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                <Text style={styles.actionLabel}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarAviso(item.id)} style={styles.actionButton}>
                <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                <Text style={[styles.actionLabel, { color: COLORS.danger }]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay avisos todavía.</Text>}
      />

      <TouchableOpacity style={styles.createButton} onPress={openCreate}>
        <Ionicons name="add" size={20} color="#FFFFFF" />
        <Text style={styles.createLabel}>CREAR AVISO</Text>
      </TouchableOpacity>

      <AvisoFormModal
        visible={modalVisible}
        initialValue={editingAviso}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { padding: 16, gap: 12 },
  card: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, gap: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, flex: 1, marginRight: 8 },
  cardSubtitle: { fontSize: 14, color: COLORS.text },
  cardMeta: { fontSize: 12, color: COLORS.textMuted },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionLabel: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: 40 },
  createButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    margin: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  createLabel: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.5 },
});