import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginView from './components/login-view';
import ReimbsView from './components/reimbs-view';

export default function App() {
  const [user,setUser] = useState({username:'',password:'',id:'',isAuthenticated:false,isManager:false,reimbs:[]});

  return (
    <View style={styles.container}>

      <Text>Welcome to the Manager App!</Text>
      {!user.username ? <LoginView user={user} setUser={setUser} /> : <View>
        <Text>Logged in as {user.username}</Text>
        <ReimbsView/>
        </View>}
      
      
      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%",
    paddingRight: 20,
    
  }
});
