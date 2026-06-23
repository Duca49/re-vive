import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AvisosScreen from '../components/AvisosScreen';
import Header from '../components/Header';
import MapaScreen from '../components/MapaScreen';
import SideMenu from '../components/SideMenu';
import TopTabs from '../components/TopTabs';
import { COLORS } from '../constants/colors';

type TabKey = 'mapa' | 'avisos';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('avisos');
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onMenuPress={() => setMenuVisible(true)} />
      <TopTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      <View style={styles.content}>
        {activeTab === 'mapa' ? <MapaScreen /> : <AvisosScreen />}
      </View>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
});