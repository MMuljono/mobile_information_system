import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";
import UserContext from "./context/userContext";

export default function App() {
  const [user, setUser] = useState("");

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Navigation />
      </UserContext.Provider>
    </SafeAreaProvider>
  );
}
