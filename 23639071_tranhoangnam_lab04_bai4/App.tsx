import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

// ====== ĐỔI LINK API CỦA BẠN Ở ĐÂY ======
// Ví dụ: https://68f1a2b3c4d5e6f7.mockapi.io/api/v1/users
const API_URL = 'https://6ac4a21754a61668c5f5e1a3.mockapi.io/users';
// =========================================

const BLUE = '#1BA9F5';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Lấy dữ liệu từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json: User[] = await res.json();
        setUsers(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 4. Mỗi item: name (in đậm) + email
  const renderItem: ListRenderItem<User> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách User (ngang)</Text>
      </View>

      {loading ? (
        // 2. Đang tải -> ActivityIndicator
        <View style={styles.center}>
          <ActivityIndicator size="large" color={BLUE} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>Lỗi: {error}</Text>
          <Text style={styles.hint}>Kiểm tra lại API_URL của bạn</Text>
        </View>
      ) : (
        // 3. Tải xong -> danh sách ngang (HorizontalList)
        <View style={styles.listWrap}>
          <FlatList<User>
            data={users}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<Text style={styles.hint}>Chưa có dữ liệu</Text>}
          />
        </View>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  loadingText: { marginTop: 10, color: '#555' },
  error: { color: '#E8141C', fontSize: 15, fontWeight: '600' },
  hint: { color: '#777', marginTop: 6, textAlign: 'center' },
  listWrap: { paddingVertical: 16 },
  listContent: { paddingHorizontal: 12 },
  card: {
    width: 210,
    padding: 16,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: '#F3F8FF',
    borderWidth: 1,
    borderColor: '#CFE3FF',
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  email: { fontSize: 13, color: '#666', marginTop: 6 },
});