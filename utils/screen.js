const getBreakPoint = (width) => {
  const breakPoints = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  if (width <= breakPoints.sm) {
    return "sm";
  }
  if (width <= breakPoints.md) {
    return "md";
  } else if (width <= breakPoints.lg) {
    return "lg";
  } else {
    return "xl";
  }
};

export { getBreakPoint };
