import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import CardView from '../components/CardView';
import LastOrderView from '../components/LastOrderView';
import { navigate } from '../NavigationService';
import gestioneAccount from '../viewmodel/gestioneAccount';

export default function Profile() {
    const navigation = useNavigation();

    //TO-DO: questi dati devono essere ottenuti tramite una chiamata getUser alla viewmodel e poi passati alle componenti come props
    //simula l'oggetto ricevuto dalla chiamata
    const Dati = {
        Nome: 'Mario',
        Cognome: 'Rossi',
        Carta: {
            Numero: "6789",
            Mese: "12",
            Anno: "2024",
            Titolare: "Mario Rossi"
        }

    }
    //simula la chiamata
    getUserData = () => {
        return Dati
    }

    /*
    N.B. specifica solamente per questa pagina non per altre
    NomeChiamata: getUserData()
    DALLA VIEW MODEL ASINCRONA -> 
    Restituito un oggetto per la carta con
        - Nome
        - Cognome
        - Carta{
            Numero
            Mese
            Anno
            Titolare
        }
    */

    /*
    NomeChiamata: LastOrderMenu()
    DALLA VIEW MODEL ASINCRONA
    restituisce un oggetto per lastOrder
        - Nome del piatto
        - Descrizione breve
        - Prezzo
        - Immagine

    se l'ultimo ordine esisteva "NOT_AVAILABLE" -> "menu non disponibile"
    se l'ultimo non esiste "NULL" -> "nessun ordine recente"
    */

    /*
    NomeChiamata: LastOrderTime()
    DALLA VIEWMODEL ASINCRONA
    restituisce un oggetto con ora e data, 
        - Data formattato in giorno n°giorno mese
        - Ora formato HH/MM
    */

    //TO-DO: manca il costrutto di selezione che se vede che la carta non è caricata scrive nessuna carta inserita
    /*
        L'oggetto carta sarà null e quindi terrò la schermata vuota
    */

    const [datiUtente, setDatiUtente] = useState(null)

    /*gestioneAccount.updateUserName({Cognome: "Rossi", Nome: "Matteo"}).then(()=>{
        console.log("inserimento dati")
    }).catch((error)=>{
        console.log("errore",error)
    })*/
    //----> DA USARE QUANDO TUTTO FUNZIONA

    
    
    //simulazione della useEffect e chiamata per dati utente e carta
    



    //---------------------- SIMULAZIONE CHIAMATA PER DATI ULTIMO ORDINE -------------------------------
    const [lastMenu, setLastMenu] = useState()

    //Simulazione dei dati ricevuti dalla rete
    const lastOrder = {
        Nome: 'Pasta al Pesto',
        Descrizione: "Un piatto molto esotico da terre lontane genovesi",
        Prezzo: '12,99€',
        Immagine: "../assets/piatto.png"
    }


    
    //Simulazione della funzione per prendere i dati dell'ultimo menu
    lastOrderMenu = () => {
        return lastOrder
    }

    //---------------------------------------------------------------------------------------------------


    //---------------------- SIMULAZIONE CHIAMATA PER DATA E ORA ULTIMO ORDINE -------------------------------
    const [lastOrderMenuTime, setLastOrderMenuTime] = useState()

    //Simulazione dei dati ricevuti dalla rete
    const dataTempo = {
        risposta: "Lunedì 25 maggio 2024, 16:30" 
    }

    //Simulazione della funzione per prendere i dati dell'orario dell'ultimo ordine
    const lastOrderTime = () => {
        return dataTempo
    }

    //---------------------------------------------------------------------------------------------------

    /*useEffect(()=>{
        let d = getUserData()
        setDatiUtente(d)
        let m = lastOrderMenu()
        setLastMenu(m) //se metti questo a null e lastOrderMenuTime vedi cosa fa
        let t = lastOrderTime()
        setLastOrderMenuTime(t)
    },[])*/

    useEffect(()=>{
        gestioneAccount.getUserData().then((datiUtente)=>{
            setDatiUtente(datiUtente)
            let m = lastOrderMenu()
            setLastMenu(m) //se metti questo a null e lastOrderMenuTime vedi cosa fa
        }).catch((error)=>{
            console.log("errore caricamento dei dati dell'utente",error)
            //gestisci con una schermata di reload
        })
    },[])

    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
            

            {lastOrderMenuTime?.risposta && (<Text style={styles.ora}>{lastOrderMenuTime.risposta}</Text>)}

            <View style={styles.lastOrderContainer}>
                <LastOrderView lastMenu={lastMenu}/>
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
    }
});
