import {Text, View, Button, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../NavigationService';
import gestioneAccount from '../viewmodel/gestioneAccount';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import Storage from '../model/storage';

export default function Prova(){

    Storage.getUid().then((ris)=>{
        console.log("uid",ris)
    }).catch((error)=>{
        console.log("errore",error)
    })

    Storage.getSid().then((ris)=>{
        console.log("sid",ris)
    }).catch((error)=>{
        console.log("errore",error)
    })

    const getDati = () => {
        gestioneOrdini.effettuaOrdine(63).then(()=>{
            console.log("ordine a buon fine")
        }).catch((error)=>{
            console.log("errore: ",error);
            
        })
    }

    return(
        <View style={styles.container}>
            <Button title="Crea Utente" onPress={()=>getDati()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})