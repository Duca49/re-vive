import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

type TabKey = 'mapa' | 'avisos';

type Props = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'mapa', label: 'Mapa' },
  { key: 'avisos', label: 'Avisos' },
];

export default function TopTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChangeTab(tab.key)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: COLORS.primary },
  label: { fontSize: 15, color: COLORS.textMuted, fontWeight: '600' },
  labelActive: { color: COLORS.primary },
});