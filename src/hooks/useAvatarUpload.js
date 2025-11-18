import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

/**
 * useAvatarUpload:
 * - выбор из галереи (при необходимости можно добавить камеру)
 * - ресайз/кроп до квадрата и сжатие
 * - uploadToServer - адаптируйте под ваш API
 *
 * Для Expo замените реализации picker/resizer на expo-image-picker + expo-image-manipulator.
 */

export default function useAvatarUpload({ onUploadSuccess } = {}) {
  const [avatarUri, setAvatarUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = useCallback(async () => {
    try {
      const r = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: false,
        quality: 0.85,
      });

      if (r.didCancel || !r.assets || r.assets.length === 0) return;
      const asset = r.assets[0];
      await processAndUpload(asset.uri);
    } catch (e) {
      console.warn('pickImage error', e);
    }
  }, []);

  async function processAndUpload(uri) {
    try {
      setUploading(true);

      // resize/crop to square 600x600 cover
      const resized = await ImageResizer.createResizedImage(
        uri,
        600,
        600,
        'JPEG',
        80,
        0,
        undefined,
        false,
        { mode: 'cover' }
      );

      const localUri = Platform.OS === 'android' ? resized.uri : resized.uri.replace('file://', '');
      const result = await uploadToServer(localUri);

      if (result?.url) {
        setAvatarUri(result.url);
        onUploadSuccess && onUploadSuccess(result.url);
      }
    } catch (err) {
      console.warn('processAndUpload error', err);
    } finally {
      setUploading(false);
    }
  }

  async function uploadToServer(localUri) {
    // Пример отправки: адаптируйте URL и авторизацию
    const form = new FormData();
    form.append('file', {
      uri: localUri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });

    const resp = await fetch('https://your.api/upload/avatar', {
      method: 'POST',
      body: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${token}`, // при необходимости
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error('Upload failed: ' + text);
    }

    return await resp.json(); // ожидается { url: 'https://cdn/...' }
  }

  return { avatarUri, uploading, pickImage };
}