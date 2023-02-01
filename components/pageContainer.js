import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

const PageContainer = ({ children, style }) => {
  const tailwind = useTailwind();
  return <View style={[tailwind("flex flex-1"), style]}>{children}</View>;
};

export default PageContainer;
