import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginView from './components/login-view';
import ReimbsView from './components/reimbs-view';


export default function App() {
  const [user,setUser] = useState({username:'',password:'',id:'',isAuthenticated:false,isManager:false,reimbs:[]});

  
  return (
    <View style={styles.container}>
      
      {!user.isAuthenticated ? <LoginView user={user} setUser={setUser} /> : <View>
        
        <ReimbsView setUser={setUser}/>
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
    flexDirection: 'column',
    marginTop: "10%",
    backgroundColor: '#eeffee',
    overflow: 'scroll',
  },
});
