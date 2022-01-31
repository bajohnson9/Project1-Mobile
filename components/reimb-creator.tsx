import { useState } from "react"
import { StyleSheet, Text, View, TextInput, Button } from "react-native"
import { AddRequest, ReimbursementItem, ReimbursementStatus } from "../dtos/dtos"
import axios from "axios"

export default function ReimbCreator(props:{reimbs:ReimbursementItem[], updateReimbs:Function}){

    const [typeInput, setType] = useState(null)
    const [descInput, setDesc] = useState(null)
    const [amtInput, setAmt] = useState(null)
    const [empInput, setEmp] = useState(null)

    async function createReimb(){
        const requ:AddRequest = {
            user:{
                username:empInput,
                password:"",
                id:"",
                isAuthenticated:false,
                isManager:false,
                reimbs: []
            },
            reimb:{
                id:"",
                type:typeInput,
                desc:descInput,
                amount:amtInput,
                status:ReimbursementStatus.pending
            }
        }
        
        const response = await axios.post("https://project1-backend-final.azurewebsites.net/reimbs", requ);
        const reimb = response.data;
        
        
        //add new reimb and set state
        let newReimbs:ReimbursementItem[] = props.reimbs
        newReimbs.push(reimb)
        props.updateReimbs(newReimbs)
    }

    

    return(<View style={styles.creatorView}>
        <Text>Type:</Text>
        <TextInput style={styles.textBox} onChangeText={t=>setType(t)}></TextInput>
        <Text>Description:</Text>
        <TextInput style={styles.textBox} onChangeText={t=>setDesc(t)}></TextInput>
        <Text>Amount:</Text>
        <TextInput style={styles.textBox} onChangeText={t=>setAmt(t)}></TextInput>
        <Text>Employee:</Text>
        <TextInput style={styles.textBox} onChangeText={t=>setEmp(t)}></TextInput>

        <Button color={'#30634a'} onPress={createReimb} title={"Create"}/>    

    </View>)
}


const styles = StyleSheet.create({
    creatorView: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffeeff',
      
      justifyContent: 'space-between',
      marginTop: "2%",
      marginBottom: "2%",
      marginLeft: "2%",
      marginRight: "2%",
      paddingRight: 200,
      alignItems: 'stretch'
    },
    textBox: {
        flex:1,
        backgroundColor:'#eeffee',
        alignItems: 'stretch',
    }
  });
  