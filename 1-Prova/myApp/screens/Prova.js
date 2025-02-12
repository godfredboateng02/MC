import {Text, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../NavigationService';
import gestioneAccount from '../viewmodel/gestioneAccount';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import Storage from '../model/storage';
import { useState } from 'react'
import formattazione from '../viewmodel/formattazione';

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

    /*const getDati = () => {
        gestioneOrdini.effettuaOrdine(63).then(()=>{
            console.log("ordine a buon fine")
            gestioneOrdini.G
        }).catch((error)=>{
            console.log("errore: ",error);
            
        })
    }*/

    const [image, setImage] = useState()

    const getDati = () => {
        gestioneOrdini.lastOrderMenu().then((risposta)=>{
            //console.log("ordine ",risposta)
            let t = "data:image/png;base64,"+risposta.Immagine.slice(8,-1)
            console.log(t)
            setImage(t)
            //let t = formattazione.showImage(risposta.Immagine.slice(7))
            //setImage(t)

        }).catch((error)=>{
            console.log("errore",error)
        })
    }

    if (image != null){
        return(
            <View style={styles.container}>
                <Button title="Crea Utente" onPress={()=>getDati()} />
                <View>
                    <Image style={styles.cardImage} source={{uri: image}} />
                </View>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <Button title="Crea Utente" onPress={()=>getDati()} />
                <Text>Nada non funziono</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage:  {
        width: 300
    }
})