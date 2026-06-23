import { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text, TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { Aviso } from '../types/aviso';

type FormData = Omit<Aviso, 'id' | 'creadoEn' | 'estado'>;

type Props = {
  visible: boolean;
  initialValue: Aviso | null;
  onClose: () => void;
  onSave: (data: FormData) => void;
};

const EMPTY: FormData = {
  titulo: '',
  descripcion: '',
  cantidadKg: 0,
  esOrganicoCompostable: false,
  ventanaRetiroHoras: 4,
  benefactorNombre: '',
};

export default function AvisoFormModal({ visible, initialValue, onClose, onSave }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (initialValue) {
      const { id, creadoEn, estado, ...rest } = initialValue;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
  }, [initialValue, visible]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.titulo.trim() || !form.benefactorNombre.trim()) return;
    onSave(form);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{initialValue ? 'Editar aviso' : 'Crear aviso'}</Text>

          <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} value={form.titulo} onChangeText={(t) => update('titulo', t)} placeholder="Ej: 100 kg Papas Imperfectas" />

            <Text style={styles.label}>Descripción</Text>
            <TextInput style={styles.input} value={form.descripcion} onChangeText={(t) => update('descripcion', t)} placeholder="Ej: Lista para retiro" />

            <Text style={styles.label}>Cantidad (kg)</Text>
            <TextInput
              style={styles.input}
              value={String(form.cantidadKg)}
              onChangeText={(t) => update('cantidadKg', Number(t.replace(/[^0-9]/g, '')) || 0)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Ventana de retiro (horas)</Text>
            <TextInput
              style={styles.input}
              value={String(form.ventanaRetiroHoras)}
              onChangeText={(t) => update('ventanaRetiroHoras', Number(t.replace(/[^0-9]/g, '')) || 0)}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Benefactor</Text>
            <TextInput style={styles.input} value={form.benefactorNombre} onChangeText={(t) => update('benefactorNombre', t)} placeholder="Ej: Supermercado Central" />

            <View style={styles.switchRow}>
              <Text style={styles.label}>¿Orgánico compostable?</Text>
              <Switch value={form.esOrganicoCompostable} onValueChange={(v) => update('esOrganicoCompostable', v)} trackColor={{ true: COLORS.primary }} />
            </View>
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelLabel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveLabel}>{initialValue ? 'Guardar' : 'Crear'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.primary, marginBottom: 12 },
  form: { marginBottom: 12 },
  label: { fontSize: 13, color: COLORS.textMuted, marginTop: 10, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: COLORS.text },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelButton: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  cancelLabel: { color: COLORS.text, fontWeight: '600' },
  saveButton: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  saveLabel: { color: '#FFFFFF', fontWeight: '700' },
});