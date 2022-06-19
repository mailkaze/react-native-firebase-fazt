import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersList from "./screens/UsersList";
import UserDatailsScreen from "./screens/UserDatailsScreen";
import CreateUserScreen from "./screens/CreateUserScreen";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="UsersList" 
        component={UsersList} 
        options={
          {
            title: "Users List",
          }
        }
      />
      <Stack.Screen 
        name="CreateUserScreen" 
        component={CreateUserScreen} 
        options={
          {
            title: "Create a new user",
          }
        }
      />
      <Stack.Screen 
        name="UserDatailsScreen" 
        component={UserDatailsScreen} 
        options={
          {
            title: "User's details",
          }
        }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
