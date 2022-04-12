import Navigation from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [loaded] = useFonts({
    Roboto_Black: require("./assets/Fonts/Poppins-Black.ttf"),
    Roboto_Bold: require("./assets/Fonts/Poppins-Bold.ttf"),
    Roboto_Italic: require("./assets/Fonts/Poppins-Italic.ttf"),
    Roboto_Light: require("./assets/Fonts/Poppins-Light.ttf"),
    Roboto_Medium: require("./assets/Fonts/Poppins-Medium.ttf"),
    Roboto_Regular: require("./assets/Fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <PaperProvider>
      <Navigation />
      <FlashMessage
        position="bottom"
        // style={{ top: 40 }}
        floating={true}
      />
    </PaperProvider>
  );
}
