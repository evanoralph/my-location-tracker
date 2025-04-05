import { Box } from "@/components/ui/box";
import { SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface LocationSearchProps {
  onLocationSelect: (details: any) => void;
  onTranslateCoordinates: (coordinates: { latitude: number; longitude: number }) => void;
}

export const LocationSearch = ({ onLocationSelect, onTranslateCoordinates }: LocationSearchProps) => {
  return (
    <Box className="absolute top-0 z-10 w-[90%] self-center mt-10">
      <SafeAreaView>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          placeholder="Search for a location"
          onPress={(data, details = null) => {
            if (details) {
              onLocationSelect(details);
              onTranslateCoordinates({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }
          }}
        />
      </SafeAreaView>
    </Box>
  );
}; 