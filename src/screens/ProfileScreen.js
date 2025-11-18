import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import useAvatarUpload from '../hooks/useAvatarUpload';
import { calculateRank, RANKS, getRankProgress } from '../constants/ranks';
import { useGameStore } from '../store/gameStore';

/**
 * Профиль игрока: аватар (с рамкой), ник с цветом по рангу, статистика.
 * Нажатие на аватар — выбор нового изображения (галерея/камера).
 */
export default function ProfileScreen() {
  const { user, setUser } = useGameStore(state => ({ user: state.user, setUser: state.setUser }));
  const { avatarUri, uploading, pickImage, takePhoto } = useAvatarUpload({
    onUploadSuccess: (uploadedUrl) => {
      setUser({ avatar: uploadedUrl });
    },
  });

  const totalWins = user?.totalWins || 0;
  const rankKey = calculateRank(totalWins);
  const rankColor = RANKS[rankKey]?.color || '#111';
  const progress = getRankProgress(totalWins);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={pickImage}
          disabled={uploading}
          accessibilityLabel="Изменить аватар"
        >
          <Image
            source={{ uri: avatarUri || user.avatar || 'https://placehold.co/300x300' }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/avatar-frame.png')}
            style={styles.avatarFrame}
            resizeMode="contain"
          />
          {uploading && (
            <View style={styles.uploadOverlay}>
              <ActivityIndicator color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={[styles.nickname, { color: rankColor }]} numberOfLines={1}>
            {user.nickname || 'Игрок'}
          </Text>
          <Text style={styles.rank}>Ранг: {rankKey}</Text>
          <Text style={styles.stats}>Побед: {totalWins} • Поражений: {user.totalLosses || 0}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%`, backgroundColor: rankColor }]} />
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.sectionTitle}>Статистика</Text>
        <Text>Лучший счет: {user.bestScore || 0}</Text>
        <Text>Средний счет: {user.avgScore ? Math.round(user.avgScore) : 0}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            // Здесь можно открыть экран редактирования ника/рамки
          }}
        >
          <Text style={styles.editButtonText}>Редактировать профиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 120;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2, overflow: 'hidden' },
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE },
  avatarFrame: { position: 'absolute', top: 0, left: 0, width: AVATAR_SIZE, height: AVATAR_SIZE },
  uploadOverlay: { position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center' },
  info: { marginLeft: 16, flex: 1 },
  nickname: { fontSize: 20, fontWeight: '700' },
  rank: { marginTop: 6, color: '#374151' },
  stats: { marginTop: 4, color: '#6B7280' },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 8, marginTop: 10, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  details: { marginTop: 24 },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  editButton: { marginTop: 16, padding: 12, backgroundColor: '#2563EB', borderRadius: 8 },
  editButtonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
