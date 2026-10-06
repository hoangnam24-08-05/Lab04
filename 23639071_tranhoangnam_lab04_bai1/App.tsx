import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ListRenderItem,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

const BLUE = '#1BA9F5';

type Shop = {
  id: string;
  name: string;
  shop: string;
  img: ImageSourcePropType;
};

const SHOPS: Shop[] = [
  { id: '1', name: 'Ca nấu lẩu, nấu cháo, cầm tay', shop: 'Shop Devang', img: require('./images/ca_nau_lau.png') },
  { id: '2', name: '1KG KHÔ GÀ BƠ TỎI ...', shop: 'Shop: LTD Food', img: require('./images/ga_bo_toi.png') },
  { id: '3', name: 'Xe cần cầu đa năng', shop: 'Shop: Thế giới đồ chơi', img: require('./images/xa_can_cau.png') },
  { id: '4', name: 'Đồ chơi dạng mô hình', shop: 'Shop: Thế giới đồ chơi', img: require('./images/do_choi_dang_mo_hinh.png') },
  { id: '5', name: 'Lãnh đạo giản đơn', shop: 'Shop: Minh Long Book', img: require('./images/lanh_dao_gian_don.png') },
  { id: '6', name: 'Hiểu lòng con trẻ', shop: 'Shop: Minh Long Book', img: require('./images/hieu_long_con_tre.png') },
  { id: '7', name: 'Giáo dục sớm cho trẻ', shop: 'Shop: Minh Long Book', img: { uri: 'https://picsum.photos/id/42/100' } },
];

export default function App() {
  const renderItem: ListRenderItem<Shop> = ({ item }) => (
    <View style={styles.row}>
      <Image source={item.img} style={styles.img} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text style={styles.shop}>{item.shop}</Text>
      </View>
      <TouchableOpacity style={styles.chatBtn}>
        <Text style={styles.chatText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>←</Text>
        <Text style={styles.headerTitle}>Chat</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>

      <Text style={styles.notice}>
        Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chat với shop!
      </Text>

      {/* Danh sách dùng FlatList */}
      <FlatList<Shop>
        data={SHOPS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerIcon}>☰</Text>
        <Text style={styles.footerIcon}>⌂</Text>
        <Text style={styles.footerIcon}>↩</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  header: {
    backgroundColor: BLUE,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  icon: { color: '#fff', fontSize: 18 },
  notice: {
    padding: 12,
    fontSize: 12,
    color: '#333',
    backgroundColor: '#f2f2f2',
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  img: { width: 48, height: 48, borderRadius: 4, marginRight: 10, resizeMode: 'contain' },
  info: { flex: 1, marginRight: 8 },
  name: { fontSize: 13, fontWeight: '500' },
  shop: { fontSize: 11, color: '#777', marginTop: 4 },
  chatBtn: {
    backgroundColor: '#E8141C',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 2,
  },
  chatText: { color: '#fff', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#ddd' },
  footer: {
    backgroundColor: BLUE,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerIcon: { color: '#fff', fontSize: 22 },
});