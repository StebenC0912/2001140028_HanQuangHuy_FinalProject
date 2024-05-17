import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import NewNoteScreen from "../screens/NewNoteScreen";
import EditNote from "../screens/EditNoteScreen";

const Stack = createNativeStackNavigator();
function CreateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notes"
        component={HomeScreen}
        options={{
          title: "Notes",
          headerShown: false,
        }}
      />
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNote} />
    </Stack.Navigator>
  );
}
export default function AppNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home" component={CreateStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
