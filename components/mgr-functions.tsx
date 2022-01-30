import { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput, Button } from "react-native"
import { ReimbursementItem, ReimbursementStatus, User } from "../dtos/dtos"
import axios from "axios"

export default function MgrFunctions(props:{reimb:ReimbursementItem, reimbs:ReimbursementItem[], updateReimbs:Function}){
    //const [reimbs,setReimbs] = useState([])
    let reimb:ReimbursementItem = props.reimb;

    async function approveReimb(){
        //approve reimb
        const response = await axios.patch("https://project1-backend-final.azurewebsites.net/reimbs/approve", reimb);
        reimb = response.data;
        //find reimb in props.reimbs
        let newReimbs:ReimbursementItem[] = props.reimbs
        newReimbs[props.reimbs.findIndex(r => r.id === reimb.id)] = reimb;
        //return new reimbs
        props.updateReimbs(newReimbs)
    }

    //same as ^
    async function denyReimb(){
        const response = await axios.patch("https://project1-backend-final.azurewebsites.net/reimbs/deny", reimb);
        reimb = response.data;
        let newReimbs:ReimbursementItem[] = props.reimbs
        newReimbs[props.reimbs.findIndex(r => r.id === reimb.id)] = reimb;
        props.updateReimbs(newReimbs)
    }

    async function deleteReimb(){
        //approve reimb
        const response = await axios.delete("https://project1-backend-final.azurewebsites.net/reimbs", {data:reimb});
        reimb = response.data;
        //find reimb in props.reimbs
        let newReimbs:ReimbursementItem[] = props.reimbs
        newReimbs[props.reimbs.findIndex(r => r.id === reimb.id)] = reimb;
        //return new reimbs
        props.updateReimbs(newReimbs)
    }

    return(<View style={styles.buttonView}>
        
        <Button color={'#30634a'} onPress={approveReimb} title={"Approve"}/>
        <Button color={'#30634a'} onPress={denyReimb} title={"Deny"}/>
        <Button color={'#30634a'} onPress={deleteReimb} title={"Delete"}/>        

    </View>)
}


const styles = StyleSheet.create({
    buttonView: {
      flex: 0,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: "10%",
      
      paddingHorizontal: 10,
      
    
    }
  });
  