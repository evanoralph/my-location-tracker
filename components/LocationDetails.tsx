import React from 'react';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Dimensions } from 'react-native';

interface LocationDetailsProps {
  isTranslating: boolean;
  locationAddressDetails: any;
}

export const LocationDetails = ({ isTranslating, locationAddressDetails }: LocationDetailsProps) => {
  const { height } = Dimensions.get('window');

  return (
    <Box
      className="bg-[#F5F5F5] rounded-lg p-4"
      style={{
        position: 'absolute',
        alignSelf: 'center',
        top: (height / 2) + 100,
      }}
    >
      {isTranslating ? (
        <Text>Translating...</Text>
      ) : (
        <>
          <Text>Street: {locationAddressDetails?.street}</Text>
          <Text>City: {locationAddressDetails?.city}</Text>
          <Text>Country: {locationAddressDetails?.country}</Text>
          <Text>Postal Code: {locationAddressDetails?.postalCode}</Text>
          <Text>Name: {locationAddressDetails?.name}</Text>
        </>
      )}
    </Box>
  );
}; 