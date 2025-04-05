import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
type LocationPermissionStatus = 'granted' | 'denied' | 'undetermined';

export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('undetermined');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status as LocationPermissionStatus);
    } catch (err) {
      setError('Failed to check location permission');
      console.error('Error checking location permission:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status as LocationPermissionStatus);
      console.log('Permission status:', status);
      if(status === 'denied') {
        setError('Location permission denied');
        Linking.openSettings();
      }
      return status === 'granted';
    } catch (err) {
      setError('Failed to request location permission');
      console.error('Error requesting location permission:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    permissionStatus,
    isLoading,
    error,
    requestPermission,
    checkPermission,
    hasPermission: permissionStatus === 'granted',
  };
}; 