import {Text, View, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import gestioneAccount from '../viewmodel/gestioneAccount';
import { navigate } from '../NavigationService';
import {useState , useEffect} from 'react'


export default function FirstScreen(){

    const navigation = useNavigation();

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");

    //TO-DO: 
    const route = useRoute();
    //console.log("datiUtente",datiUtente)


    

    const onEdit = (utente) =>{
        gestioneAccount.updateUserName(utente).then(()=>{
            console.log("aggiornato dati utente")
            navigate("Home")
        }).catch((error)=>{
            console.log("errore aggiornamento dati",error)
        })
    }



    return (
        <View style={styles.container}>
            {/* HEADER ARANCIONE */}
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    <Text style={styles.lightText}>Profilo</Text> / <Text style={styles.boldText}>Creazione profilo</Text>
                </Text>
            </View>

            {/* FORM */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Cognome</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        maxLength={15}
                        placeholder='es. Rossi'
                    />
    
                <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        maxLength={15}
                        placeholder='es. Matteo'
                    />  

                {/* BOTTONE CONFERMA */}
                <TouchableOpacity style={styles.confirmButton} onPress={() => onEdit({Cognome: lastName, Nome: firstName})}>
                    <Text style={styles.confirmText}>Conferma </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "#FF8C00",
        height: 100,
        position: 'relative',
        flexDirection: "row",
        //justifyContent: 'center',
        paddingTop: 60,
        paddingHorizontal: 16,

    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
    headerText: {
        fontSize: 18,
        color: "#fff",
        //right: -30,
        top: 5,
        marginHorizontal: "auto",
    },
    lightText: {
        fontWeight: "300",
    },
    boldText: {
        fontWeight: "700",
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "semibold",
        marginBottom: 5,
        color: '#555555'
    },
    input: {
        borderWidth: 0.8,
        borderColor: "#555555",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 20,
        color: '#888888'
    },
    confirmButton: {
        backgroundColor: "#00C853",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
    },
    confirmText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

