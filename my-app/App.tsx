import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TemperatureScreen from "./screens/TemperatureScreen";
import HumidityScreen from "./screens/HumidityScreen";
import LightScreen from "./screens/LightScreen";
import SetupScreen from "./screens/SetupScreen";
import { StoreProvider } from "./context/Store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="temperature"
            component={TemperatureScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="humidity"
            component={HumidityScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="light"
            component={LightScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="setup"
            component={SetupScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
