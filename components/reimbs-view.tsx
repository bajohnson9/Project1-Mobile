import { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Button } from "react-native"
import { ReimbursementItem, ReimbursementStatus, User } from "../dtos/dtos"
import axios from "axios"
import Dropdown from "./reimbs-dropdown"
import MgrFunctions from "./mgr-functions"
import ReimbCreator from "./reimb-creator"

export default function ReimbsView(props:{setUser:Function}){
    const [reimbs, setReimbs] = useState<ReimbursementItem[]>([])
    const [selected, setSelected] = useState(undefined);
    const data = reimbToData(reimbs)

    async function getReimbs(){
        const response = await axios.get("https://project1-backend-final.azurewebsites.net/reimbs")
            const fetchedReimbs = response.data;
            setReimbs(fetchedReimbs);
    }

    function reimbToData(reimbs:ReimbursementItem[]){
        //take in reimbursement array, return {label: string; reimb:ReimbursementItem}
        const tempData:{label:string;reimb:ReimbursementItem}[] = []
        for(let r of reimbs){
            //value:string? or html? FUCK THAT, ITS JUST A REIMB
            const rLabel:string = (`${r.type}: ${r.desc}`);
            const rReimb = r;

            tempData.push({label:rLabel,reimb:rReimb})
        }
        return tempData;
    }

    useEffect(()=>{
        //update reimbs whenever useEffect
        getReimbs();
    }, [reimbs])

    async function logout(){
        const tempUser:User = {username:'',password:'',id:'',isAuthenticated:false,isManager:false,reimbs:[]};
        //console.log(tempUser)
        const response = await axios.patch("https://project1-backend-final.azurewebsites.net/login",tempUser);
        props.setUser(response.data);
    }

    return(<>
        <View>
            <Button color={'#30634a'} onPress={logout} title="Log Out"/>
            <View/>
            <View style={styles.container}>
                {!!selected && (<>

                {/* make this a modal :o) */}
                <Text>Selected Reimbursement:{selected.reimb.desc}</Text>
                <Text>Type: {selected.reimb.type} | Amount: {selected.reimb.amount}</Text>
                <Text>Status: {selected.reimb.status}</Text>

                <MgrFunctions 
                    reimb={selected.reimb}
                    reimbs={reimbs} 
                    updateReimbs={setReimbs}
                />
            </>)}   
            <Dropdown label="Select Item" data={data} onSelect={setSelected}/>
        </View>
    </View>
        <View style={styles.form}>
            <ReimbCreator  reimbs={reimbs} updateReimbs={setReimbs}/>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
      flex: .2,
      backgroundColor: '#eeeeff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "3%",
      paddingRight: 5,
      paddingLeft: 5,
      
    },
    form: {
        flex:1,
        backgroundColor:'#ffeeee',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:20,

    }
  });
  