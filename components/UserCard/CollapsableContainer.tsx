// React and React Native imports
import React, { useState, useEffect } from "react";
import { LayoutChangeEvent, View } from "react-native";

// Reanimated imports
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
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
  const [isAnimating, setIsAnimating] = useState(false);

  // Shared value for animated height
  const animatedHeight = useSharedValue(0);

  // Handler to measure the height of the child content
  const onLayout = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;
    if (newHeight !== measuredHeight) {
      setMeasuredHeight(newHeight);
    }
  };

  const onFinishAnimation = () => {
    // set the animation for actual measured height that could have changed
    animatedHeight.value = expanded ? measuredHeight : 0;
    setIsAnimating(false);
  };

  // Effect to trigger the height animation
  useEffect(() => {
    if (isAnimating) {
      return;
    }

    if (expanded) {
      animatedHeight.value = withTiming(
        measuredHeight,
        {
          duration: 800,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(onFinishAnimation)();
          }
        }
      );
    } else {
      animatedHeight.value = withTiming(
        0,
        {
          duration: 800,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(onFinishAnimation)();
          }
        }
      );
    }
  }, [expanded, measuredHeight]);

  // Animated style for the collapsable container
  const collapsableStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

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
