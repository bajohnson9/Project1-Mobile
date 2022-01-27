import { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput, Button } from "react-native"
import { ReimbursementItem, ReimbursementStatus, User } from "../dtos/dtos"
import axios from "axios"

export default function LoginView(props:{user:User,setUser:Function}){
    const [un, setUn] = useState('');
    const [pw, setPw] = useState('');
    

    async function login(){
        const tempUser:User = {username:un,password:pw,id:'',isAuthenticated:false,isManager:false,reimbs:[]};
        //console.log(tempUser)
        const response = await axios.patch("http://localhost:5000/login",tempUser);
        props.setUser(response.data);
        console.log(props.user)
    }

    function getUsername(){
        return props.user.username;
    }

    useEffect(()=>{
        //update reimbs whenever useEffect
        login();
        console.log(un)
    }, [])


    return(<View>
        <Text>Username:</Text>
        <TextInput style={{backgroundColor:'#ffeeff'}} onChangeText={t=>setUn(t)}></TextInput>

        <Text>Password:</Text>
        <TextInput style={{backgroundColor:'#ffeeff'}} onChangeText={t=>setPw(t)}></TextInput>

        <Button onPress={login} title={"Login"}/>

        

    </View>)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffeeff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "10%",
      paddingRight: 20,
      
    }
  });
  