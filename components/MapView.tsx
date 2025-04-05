import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";
import { useColorScheme } from "react-native";
import { mapsStyleDark } from "@/constants/maps-style";
import { LocationObject } from "expo-location";
import { RefObject } from "react";
import LottieView from "lottie-react-native";

interface MapViewProps {
  mapRef: RefObject<MapView>;
  lottieRef: RefObject<LottieView>;
  location: LocationObject | null;
  onMapDragStart: () => void;
  onRegionChange: (region: Region) => void;
  onMapDragEnd: (region: Region) => void;
}

export const CustomMapView = ({
  mapRef,
  lottieRef,
  location,
  onMapDragStart,
  onRegionChange,
  onMapDragEnd,
}: MapViewProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  if (!location) return null;

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      customMapStyle={isDarkMode ? mapsStyleDark : []}
      provider={PROVIDER_DEFAULT}
      onMapReady={onMapDragStart}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onRegionChange={onRegionChange}
      onRegionChangeComplete={onMapDragEnd}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}); 