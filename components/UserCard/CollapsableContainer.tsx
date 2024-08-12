import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;
    if (newHeight > 2 && newHeight !== measuredHeight) {
      setMeasuredHeight(newHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded
      ? withTiming(measuredHeight, { duration: measuredHeight / 2 }) // Adjust the duration as needed
      : withTiming(0, { duration: measuredHeight / 2 });

    return {
      height: animatedHeight.value,
    };
  }, [expanded, measuredHeight]);

  return (
    <Animated.View
      style={[collapsableStyle, { overflow: "hidden" }]}
      className="w-full"
    >
      <View className="absolute w-full" onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};
