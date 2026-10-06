import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ListRenderItem,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

const BLUE = '#1BA9F5';

type Product = {
  id: string;
  name: string;
  price: string;
  discount: string;
  rating: number;
  sold: number;
  img: ImageSourcePropType;
};

const NAME = 'Cáp chuyển từ Cổng USB sang PS2...';

const PRODUCTS: Product[] = [
  { id: '1', name: NAME, price: '69.900 đ', discount: '-77%', rating: 4, sold: 15, img: require('./images/carbusbtops2 1.png') },
  { id: '2', name: NAME, price: '69.900 đ', discount: '-77%', rating: 4, sold: 15, img: require('./images/daynguon 1.png') },
  { id: '3', name: NAME, price: '69.900 đ', discount: '-77%', rating: 4, sold: 15, img: require('./images/daucam 1.png') },
  { id: '4', name: NAME, price: '69.900 đ', discount: '-77%', rating: 4, sold: 15, img: require('./images/dauchuyendoi 1.png') },
  { id: '5', name: NAME, price: '69.900 đ', discount: '-77%', rating: 4, sold: 15, img: require('./images/dauchuyendoipsps2 1.png') },
  { id: '6', name: NAME, price: '69.900 đ', discount: '-77%', rating: 4, sold: 15, img: require('./images/giacchuyen 1.png') },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>('6');

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    const selected = item.id === selectedId;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedId(item.id)}
        style={[styles.card, selected && styles.cardSelected]}
      >
        <Image source={item.img} style={styles.cardImg} />
        <Text numberOfLines={2} style={styles.cardName}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.stars}>
            {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
          </Text>
          <Text style={styles.sold}> ({item.sold})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.discount}>{item.discount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>←</Text>
        <View style={styles.searchBox}>
          <Text style={{ fontSize: 14 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            defaultValue="Dây cáp usb"
            placeholder="Tìm kiếm"
          />
        </View>
        <View>
          <Text style={styles.icon}>🛒</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </View>
        <Text style={[styles.icon, { marginLeft: 10 }]}>•••</Text>
      </View>

      {/* Lưới 2 cột */}
      <FlatList<Product>
      data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ padding: 8 }}
        extraData={selectedId}
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
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  header: {
    backgroundColor: BLUE,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  icon: { color: '#fff', fontSize: 18 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: 8,
    height: 32,
  },
  searchInput: { flex: 1, marginLeft: 6, fontSize: 13, padding: 0 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#E8141C',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: '48.5%',
    backgroundColor: '#fff',
    padding: 6,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: { borderColor: '#22A04B' },
  cardImg: { width: '100%', height: 110, resizeMode: 'contain' },
  cardName: { fontSize: 12, marginTop: 6 },
  stars: { fontSize: 11, color: '#F5B400' },
  sold: { fontSize: 11, color: '#777' },
  price: { fontSize: 13, fontWeight: '700', marginRight: 10 },
  discount: { fontSize: 12, color: '#999' },
  footer: {
    backgroundColor: BLUE,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerIcon: { color: '#fff', fontSize: 22 },
});