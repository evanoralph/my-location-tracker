import { StyleSheet, TouchableOpacity } from "react-native";
import { images } from "@/assets/images";
import { Image } from "react-native";

interface CenterButtonProps {
  onPress: () => void;
}

export const CenterButton = ({ onPress }: CenterButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.centerButton}
      onPress={onPress}
    >
      <Image source={images.position} className="w-10 h-10" resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centerButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 