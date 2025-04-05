import { Box } from "@/components/ui/box";
import { images } from "@/assets/images";
import { Image } from "@/components/ui/image";
import { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { router } from "expo-router";
export default function Index() { 
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
    scale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
    redirect();
  }, []);


  const redirect = () => {
    setTimeout(() => {
      router.replace("/map-page");
    }, 1000);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
  


  return (
    <Box className="flex-1 items-center justify-center">
      <Animated.View style={animatedStyle}>
        <Image source={images.logo} alt="logo" className="w-[200px] h-[200px]" />
      </Animated.View>
    </Box>
  );
}
