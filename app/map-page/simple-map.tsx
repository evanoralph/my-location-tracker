import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';

const { height } = Dimensions.get('window');

export default function SimpleMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const mapRef = useRef<MapView>(null);
  const [address, setAddress] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        getCurrentLocation();
      }
    })();
  }, []);

  const getCurrentLocation = async () => {
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
      }

      // Get address
      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      
      if (address[0]) {
        setAddress(`${address[0].street}, ${address[0].city}, ${address[0].country}`);
      }
    } catch (error) {
      setErrorMsg("Could not get current location");
    }
  };

  const handleRegionChange = (region: Region) => {
    // You can add additional logic here when the map region changes
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=YOUR_GOOGLE_MAPS_API_KEY`
        );
        const data = await response.json();
        setPredictions(data.predictions || []);
        setShowPredictions(true);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  };

  const handlePredictionSelect = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      const location = data.result.geometry.location;
      
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      }

      setSearchQuery(data.result.formatted_address);
      setAddress(data.result.formatted_address);
      setShowPredictions(false);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : location ? (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search location..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {showPredictions && (
              <View style={styles.predictionsContainer}>
                <FlatList
                  data={predictions}
                  keyExtractor={(item) => item.place_id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.predictionItem}
                      onPress={() => handlePredictionSelect(item.place_id)}
                    >
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={handleRegionChange}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>
          
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{address}</Text>
          </View>

          <TouchableOpacity 
            style={styles.centerButton}
            onPress={getCurrentLocation}
          >
            <Text style={styles.centerButtonText}>Center</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading map...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  predictionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 200,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  predictionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addressContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addressText: {
    fontSize: 14,
  },
  centerButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
}); 