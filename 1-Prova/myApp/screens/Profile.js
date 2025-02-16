import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import CardView from '../components/CardView';
import LastOrderView from '../components/LastOrderView';
import { navigate } from '../NavigationService';
import gestioneAccount from '../viewmodel/gestioneAccount';
import Storage from '../model/storage';
import gestioneOrdini from '../viewmodel/gestioneOrdini';

export default function Profile() {
    const navigation = useNavigation();

  
    //TO-DO: RIMUOVI ASSOLUTAMENTE QUESTE 2 RIGHEEEEEEE!
    Storage.getSid().then((risu)=>{console.log(risu)})
    Storage.getUid().then((risu)=>{console.log(risu)})

    const [datiUtente, setDatiUtente] = useState(null)

 


    //---------------------- SIMULAZIONE CHIAMATA PER DATI ULTIMO ORDINE -------------------------------
    const [lastMenu, setLastMenu] = useState()

    //---------------------- SIMULAZIONE CHIAMATA PER DATA E ORA ULTIMO ORDINE -------------------------------
    const [lastOrderMenuTime, setLastOrderMenuTime] = useState("tempo")

   
    useEffect(()=>{
        gestioneAccount.getUserData().then((datiUtente)=>{
            setDatiUtente(datiUtente)
            //let m = lastOrderMenu()
            //setLastMenu(m) //se metti questo a null e lastOrderMenuTime vedi cosa fa
        
        }).catch((error)=>{
            console.log("errore caricamento dei dati dell'utente",error)
            //gestisci con una schermata di reload
        })
        
        gestioneAccount.lastOrderTime().then((tempo)=>{
            console.log("tempo:",tempo)
            setLastOrderMenuTime(tempo)
        }).catch((error)=>{
            console.log("errore da lastOrderTime",error)
        })
        
    },[])

    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate("Home")} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity> 
                <Image 
                    source={require('../assets/Logo.png')} // Sostituisci con il tuo logo
                    style={styles.profileImage}
                    resizeMode="contain"
                />
                {/*<Text style={styles.firstlastName}>{datiUtente.Cognome} {datiUtente.Nome}</Text>*/}
                {/*I dati della carta possono essere NULL -> Altra soluzione*/}
                {datiUtente?.Cognome && datiUtente?.Nome && (<Text style={styles.firstlastName}>{datiUtente.Cognome} {datiUtente.Nome}</Text>)}

                <TouchableOpacity onPress={() => navigate("EditProfileData",{datiUtente: datiUtente})}>
                    <Text style={styles.editProfile}>Modifica profilo</Text>
                </TouchableOpacity> 
            </View>
        
            
            <View style={styles.titleRow}>
                <Text style={styles.title}>La mia carta</Text>
                <TouchableOpacity onPress={() => navigate('EditProfileCard', {datiCarta: datiUtente})}>
                    <Text style={styles.editText}>Modifica</Text>
                </TouchableOpacity>
            </View>
            <CardView dati={datiUtente}/>


            <View style={styles.titleRow}>
                <Text style={styles.title}>Ordine Recente</Text>
            </View>
            


            <Text style={styles.ora}>
                {lastOrderMenuTime ? lastOrderMenuTime.Data+", "+lastOrderMenuTime.Ora : null}
            </Text>

            <View style={styles.lastOrderContainer}>
                <TouchableOpacity style={styles.touchableOrderConteiner} onPress={() => 
                    {try{
                        Storage.getMid().then((mid)=>{
                            if(mid){
                                navigate("MenuDetail",{ menuId: mid })
                            }else{
                                console.log("nessun ordine recente")
                            }
                        })
                    }catch(error){
                            console.log("errore ultimo ordine",error)
                    }
                        }}>
                    <LastOrderView />
                </TouchableOpacity> 
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5", // Sfondo chiaro come nella UI
    },
    header: {
        backgroundColor: "#FF8C00",
        height: 300, // Altezza della parte arancione
        borderBottomLeftRadius: 70, // Smussatura sinistra
        borderBottomRightRadius: 70, // Smussatura destra
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        borderRadius: 30,
        //backgroundColor: 'rgba(255,255,255,0.2)',
    },
    backText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Immagine profilo circolare
        borderWidth: 3,
        borderColor: "#fff",
    },
    firstlastName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#fff",
        marginTop: 30,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 30,
        marginBottom: 10,

    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        //marginLeft: 16,
        //marginTop: 30,
        //marginBottom: 10,
        color: '#FF8C00'
    },
    editText: {
        fontSize: 16,
        color: "#007AFF",
        fontWeight: "500",
    },
    lastOrderContainer: {
        alignItems: 'center'
    },
    ora: {
        marginLeft: 16,
        marginTop: -5,
        fontWeight: 'light',
        fontSize: 15,
        color: '#878787'

    },
    editProfile: {
        color: "#FFF",
        fontWeight: 'semibold',
    },

    touchableOrderConteiner: {
        width: '100%',
    }
});
