import { PixelRatio } from 'react-native';

export const normalizeFontSize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size));
