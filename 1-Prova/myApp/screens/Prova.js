import {Text, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../NavigationService';
import gestioneAccount from '../viewmodel/gestioneAccount';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import Storage from '../model/storage';
import { useState } from 'react'
import formattazione from '../viewmodel/formattazione';
import gestioneMenu from '../viewmodel/gestioneMenu';

export default function Prova(){



    

    const [image, setImage] = useState()

    const getDati = () => {
        gestioneMenu.lista().then((risultato)=>{
            //console.log(risultato[0].Nome)
        }).catch((error)=>{
            console.log("errore getDati",error)
        })
    }
    return(
        <View style={styles.container}>
            <Text>Prova</Text>
            <Button title="Invio" onPress={()=>getDati()} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage:  {
        alignItems: 'center',
        width: 100,
        height: 100,
    }
})