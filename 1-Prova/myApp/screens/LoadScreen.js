import {Text, View, StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { use, useEffect, useState } from 'react';
import Storage from '../model/storage';

export default function LoadScreen(){
    const navigation = useNavigation();
    const route = useRoute();
    useState(()=>{ //uso il metodo useState per fare in modo che la funzione venga eseguita solo una volta
        Storage.getPagina().then((pagina)=>{
            Storage.getParametri().then((parametri)=>{
                navigation.navigate(pagina,parametri)
            })
        })
        
    },[])
    return(
        <View>
            <Text>Caricamento dei dati...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})