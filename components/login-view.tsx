import { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput, Button } from "react-native"
import { ReimbursementItem, ReimbursementStatus, User } from "../dtos/dtos"
import axios from "axios"

export default function LoginView(props:{user:User,setUser:Function}){
    const [un, setUn] = useState(null);
    const [pw, setPw] = useState(null);
    

    async function login(){
        const tempUser:User = {username:un,password:pw,id:'',isAuthenticated:false,isManager:false,reimbs:[]};
        //console.log(tempUser)
        const response = await axios.patch("https://project1-backend-final.azurewebsites.net/login",tempUser);
        props.setUser(response.data);
    }

    useEffect(()=>{
        //update reimbs whenever useEffect
        login();
    }, [])


    return(<View>
        <Text>⚡🔥🛹🔥⚡Welcome to...⚡🔥🚀🔥⚡</Text>
        <Text>XTREME Reimbursement Dispersement</Text>

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
      paddingRight: 20    
    }
  });
  