import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

// ====== ĐỔI LINK API CỦA BẠN Ở ĐÂY ======
// Resource "users" có các field: name, email, avatar
const API_URL = 'https://6ac4a21754a61668c5f5e1a3.mockapi.io/users';
// =========================================

const BLUE = '#1BA9F5';

type ApiItem = {
  id: string;
  name: string;
  avatar?: string;
};

type Photo = {
  id: string;
  title: string;
  uri: string;
};

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState<boolean>(false); // false = ListView, true = GridView

  // 1. Lấy danh sách hình ảnh từ API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json: ApiItem[] = await res.json();
        setPhotos(
          json.map((it, idx) => ({
            id: String(it.id),
            title: it.name,
            // nếu API không có avatar thì dùng ảnh mẫu
            uri: it.avatar || `https://picsum.photos/seed/${it.id || idx}/400`,
          }))
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Item của Horizontal List (nổi bật)
  const renderFeatured: ListRenderItem<Photo> = ({ item }) => (
    <View style={styles.featuredWrap}>
      <Image source={{ uri: item.uri }} style={styles.featuredImg} />
      <Text numberOfLines={1} style={styles.featuredTitle}>{item.title}</Text>
    </View>
  );

  // Item của ListView (1 cột) / GridView (2 cột)
  const renderPhoto: ListRenderItem<Photo> = ({ item }) => (
    <View style={[styles.photoWrap, isGrid && styles.photoWrapGrid]}>
      <Image
        source={{ uri: item.uri }}
        style={[styles.photo, { height: isGrid ? 150 : 220 }]}
      />
      <Text numberOfLines={1} style={styles.photoTitle}>{item.title}</Text>
    </View>
  );

  // 2. Đang tải -> ActivityIndicator
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={BLUE} />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.error}>Lỗi: {error}</Text>
        <Text style={styles.hint}>Kiểm tra lại API_URL của bạn</Text>
      </View>
    );
  }

  return (
    // 4. Toàn bộ nằm trong ScrollView để kết hợp thêm nội dung khác
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Nội dung khác: tiêu đề + mô tả */}
      <Text style={styles.title}>📷 Gallery App</Text>
      <Text style={styles.desc}>
        Bộ sưu tập hình ảnh được tải từ API. Bấm nút bên dưới để đổi giữa
        dạng danh sách (1 cột) và dạng lưới (2 cột).
      </Text>

      {/* 3c. Horizontal List: cuộn ngang các item nổi bật */}
      <Text style={styles.section}>⭐ Nổi bật</Text>
      <FlatList<Photo>
        data={photos.slice(0, 8)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => 'f' + item.id}
        renderItem={renderFeatured}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />

      {/* 5. Nút chuyển đổi ListView <-> GridView */}
      <View style={styles.toggleRow}>
        <Text style={styles.section}>Tất cả ảnh</Text>
        <TouchableOpacity style={styles.toggleBtn} onPress={() => setIsGrid((v) => !v)}>
          <Text style={styles.toggleText}>
            {isGrid ? '☰ Chuyển sang List' : '▦ Chuyển sang Grid'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3a/3b. ListView: 1 cột - GridView: 2 cột */}
      <FlatList<Photo>
        key={isGrid ? 'grid' : 'list'} // bắt buộc đổi key khi đổi numColumns
        data={photos}
        numColumns={isGrid ? 2 : 1}
        scrollEnabled={false} // để ScrollView cha cuộn
        keyExtractor={(item) => item.id}
        renderItem={renderPhoto}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        ListEmptyComponent={<Text style={styles.hint}>Chưa có dữ liệu</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  center: { justifyContent: 'center', alignItems: 'center', padding: 16 },
  loadingText: { marginTop: 10, color: '#555' },
  error: { color: '#E8141C', fontSize: 15, fontWeight: '600' },
  hint: { color: '#777', marginTop: 6, textAlign: 'center' },

  title: { fontSize: 22, fontWeight: '800', paddingHorizontal: 12, paddingTop: 12 },
  desc: { paddingHorizontal: 12, paddingTop: 4, color: '#555' },
  section: { fontSize: 16, fontWeight: '700', padding: 12 },

  featuredWrap: { width: 140, marginRight: 10 },
  featuredImg: { width: 140, height: 140, borderRadius: 10, backgroundColor: '#eee' },
  featuredTitle: { fontSize: 12, marginTop: 4 },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  toggleBtn: {
    backgroundColor: BLUE,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  toggleText: { color: '#fff', fontWeight: '600' },

  photoWrap: { flex: 1, padding: 4 },
  photoWrapGrid: { maxWidth: '50%' },
  photo: { width: '100%', borderRadius: 8, backgroundColor: '#eee' },
  photoTitle: { marginTop: 4, fontSize: 12 },
});