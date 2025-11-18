import { useState, useEffect } from 'react';
import { Dimensions, LayoutAnimation, Platform, UIManager } from 'react-native';

// Android: enable LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Хук рассчитывает размер плитки в зависимости от gridSize и ширины контейнера.
 * Возвращает tileSize и ширину контейнера.
 * Делает плавную анимацию при изменении размеров.
 */
export default function useGridLayout(gridSize, containerPadding = 16, gap = 4) {
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width - containerPadding * 2);
  const [tileSize, setTileSize] = useState(() => calculateTileSize(gridSize, containerWidth, gap));

  useEffect(() => {
    function handler({ window }) {
      setContainerWidth(window.width - containerPadding * 2);
    }
    const sub = Dimensions.addEventListener?.('change', handler);
    return () => sub?.remove?.();
  }, [containerPadding]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTileSize(calculateTileSize(gridSize, containerWidth, gap));
  }, [gridSize, containerWidth, gap]);

  return { tileSize, containerWidth };
}

export function calculateTileSize(gridSize, containerWidth, gap = 4) {
  const availableWidth = containerWidth - (gap * (gridSize + 1));
  return Math.max(8, Math.floor(availableWidth / gridSize));
}