import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

const PageContainer = ({ children }) => {
    const tailwind = useTailwind();
    return <View style={tailwind("flex flex-1")}>{children}</View>;
};

export default PageContainer;
