import React from 'react';
import { Text } from "@/components/ui/text";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Platform, Alert, Linking } from "react-native";
import * as Location from "expo-location";
import { useLocationPermission } from "@/hooks/useLocationPermission";
import LottieView from "lottie-react-native";
import { Dimensions } from 'react-native';
import { CustomMapView } from "@/components/MapView";
import { LocationSearch } from "@/components/LocationSearch";
import { LocationDetails } from "@/components/LocationDetails";
import { CenterButton } from "@/components/CenterButton";
import 'react-native-get-random-values'
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { images } from '@/assets/images';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
const { height } = Dimensions.get('window');

export default function MapPage() {
  const [location, setLocation] = useState<Location.LocationObject | null>({
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: Date.now(),
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { permissionStatus, error, requestPermission, checkPermission, hasPermission } = useLocationPermission();
  const mapRef = useRef<any>(null);
  const lottieRef = useRef<LottieView>(null);
  const [locationAddressDetails, setLocationAddressDetails] = useState<any | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const translateCoordinatesToAddress = async (coordinates: { latitude: number; longitude: number }) => {
    setIsTranslating(true);
    const address = await Location.reverseGeocodeAsync({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    console.log('address', address);
    setLocationAddressDetails(address[0]);
    setIsTranslating(false);
  };

  useEffect(() => {
    checkPermission();
    if (permissionStatus === 'granted') {
      lottieRef.current?.pause();
      centerOnUserLocation();
    }
  }, [hasPermission, isLoading, permissionStatus]);

  const centerOnUserLocation = async () => {
    console.log('hasPermission', permissionStatus);
    if (permissionStatus !== 'granted') {
      Alert.alert('Location permission required', 'Please grant location permission to use this app', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
      await requestPermission();
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
        lottieRef.current?.pause();
        translateCoordinatesToAddress({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      }
    } catch (error) {
      setErrorMsg("Could not get current location");
    }
  };

  const onMapDragStart = () => {
    lottieRef.current?.play();
  };

  const onMapDragEnd = (region: any) => {
    console.log('coordinate', region.latitude, region.longitude);
    lottieRef.current?.reset();
    translateCoordinatesToAddress({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const onRegionChange = (region: any) => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleLocationSelect = (details: any) => {
    const newRegion = {
      longitude: details.geometry.location.lng,
      latitude: details.geometry.location.lat,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);
  };


  if(permissionStatus === 'denied') {
    return (
      <Box className="flex-1 justify-center items-center gap-4">
          <Image source={images.pin} className="w-[200px] h-[200px]" resizeMode="contain" />
          <Text className="text-2xl font-bold">Location permission required</Text>
          <Text className="text-center text-gray-500">Please grant location permission to use this app</Text> 
          <Button onPress={requestPermission}>
            <ButtonText>Open settings</ButtonText>
          </Button>
        </Box>
    )
  }

  return (
    <Box className="flex-1">
      <LocationSearch
        onLocationSelect={handleLocationSelect}
        onTranslateCoordinates={translateCoordinatesToAddress}
      />
      

      {isLoading ? (
        <Box className="flex-1 justify-center items-center">
          <Image source={images.pin} className="w-120 h-120" resizeMode="contain" />
          <Text>Loading...</Text>
        </Box>

      ) : !!errorMsg ? (
        <Box className="flex-1 justify-center items-center">
          <Image source={images.pin} className="w-120 h-120" resizeMode="contain" />
          <Text>{errorMsg}</Text>
        </Box>
      ) : location ? (
        <>
          <CustomMapView
            mapRef={mapRef}
            lottieRef={lottieRef}
            location={location}
            onMapDragStart={onMapDragStart}
            onRegionChange={onRegionChange}
            onMapDragEnd={onMapDragEnd}
          />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: (height / 2) - 50,
            }}
          >
            <LottieView
              speed={3}
              autoPlay={false}
              ref={lottieRef}
              source={require("@/assets/lottie/map-pin.json")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <LocationDetails
            isTranslating={isTranslating}
            locationAddressDetails={locationAddressDetails}
          />
          <CenterButton onPress={centerOnUserLocation} />
        </>
      ) : (
        <Text>Loading map...</Text>
      )}
    </Box>
  );
}