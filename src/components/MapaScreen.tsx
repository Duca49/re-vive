import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS } from '../constants/colors';
import { useAvisos } from '../context/AvisosContext';

const PUNTA_ARENAS_REGION = {
  latitude: -53.1638,
  longitude: -70.9171,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

const ESTADO_COLOR_MARKER: Record<string, string> = {
  activo: COLORS.success,
  reclamado: COLORS.accent,
  retirado: COLORS.textMuted,
  vencido: COLORS.danger,
};

export default function MapaScreen() {
  const { avisos } = useAvisos();
  const conUbicacion = avisos.filter((a) => a.ubicacion);

  return (
    <View style={[styles.container, { backgroundColor: 'red' }]}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={PUNTA_ARENAS_REGION}
      >
        {conUbicacion.map((aviso) => (
          <Marker key={aviso.id} coordinate={aviso.ubicacion!} pinColor={ESTADO_COLOR_MARKER[aviso.estado]}>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{aviso.titulo}</Text>
                <Text style={styles.calloutMeta}>{aviso.cantidadKg} kg · {aviso.benefactorNombre}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  callout: { maxWidth: 200, padding: 4 },
  calloutTitle: { fontWeight: '700', color: COLORS.text },
  calloutMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});