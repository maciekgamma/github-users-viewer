// React and React Native imports
import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";

// Reanimated imports
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// CollapsableContainer component
export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  // State to store the measured height of the child content
  const [measuredHeight, setMeasuredHeight] = useState(0);

  // Shared value for animated height
  const animatedHeight = useSharedValue(0);

  // Handler to measure the height of the child content
  const onLayout = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;
    if (newHeight > 2 && newHeight !== measuredHeight) {
      setMeasuredHeight(newHeight);
    }
  };

  // Animated style for the collapsable container
  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded
      ? withTiming(measuredHeight, { duration: measuredHeight / 2 }) // Expand with animation
      : withTiming(0, { duration: measuredHeight / 2 }); // Collapse with animation

    return {
      height: animatedHeight.value,
    };
  }, [expanded, measuredHeight]);

  return (
    <Animated.View
      style={[collapsableStyle, { overflow: "hidden" }]}
      className="w-full"
    >
      {/* Absolute positioning to measure child content */}
      <View className="absolute w-full" onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};
