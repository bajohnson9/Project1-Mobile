import { useEffect } from "react"
import { useState } from "react"
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from "react-native"
import { ReimbursementItem, ReimbursementStatus } from "../dtos/dtos"
import axios from "axios"

export default function ReimbsView(){
    const [reimbs, setReimbs] = useState<ReimbursementItem[]>([])

    async function getReimbs(){
        const response = await axios.get("http://localhost:5000/reimbs")
            const fetchedReimbs = response.data;
            setReimbs(fetchedReimbs);
    }

    useEffect(()=>{
        //update reimbs whenever useEffect
        getReimbs();
    }, [])


    return(<View>
        <FlatList 
            data={reimbs} 
            renderItem={({item}) =>Reimb(item)} 
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
                <View style={{height:1,backgroundColor:'#333333'}}></View>)}>
            </FlatList>
    </View>)
}

function Reimb(props:ReimbursementItem){
    return(<View><TouchableOpacity>
        <Text>Type: {props.type} {/*Description: {props.desc}*/} Amount: {props.amount} </Text>
        <Text> Status: {props.status} ID: {props.id} </Text>
    </TouchableOpacity></View>)

}

function ReimbAdder(){
    return(<View>
        <Text>Type</Text>

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
  