

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text,buttonText} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { navigate } from '../NavigationService';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import { useNavigation, useRoute } from '@react-navigation/native';
import LastOrderView from '../components/LastOrderView';

export default function Delivery() {


    const navigation = useNavigation()
    const route = useRoute()
    const { risultato } = route.params;

    const [partenza, setPartenza] = useState({latitude: risultato.Partenza.lat, longitude: risultato.Partenza.lng})
    const [destinazione, setDestinazione] = useState({latitude: risultato.Destinazione.lat, longitude: risultato.Destinazione.lng})
    const [drone, setDrone] = useState({latitude: risultato.Partenza.lat, longitude: risultato.Partenza.lng})
    const [stato, setStato] = useState()
    const [tempo, setTempo] = useState()
    const [output, setOutput] = useState("Elaborazione ordine...")
    const [consegna, setConsegna] = useState()
    const [finito, setFinito] = useState(false)     
    const [loading, setLoading] = useState(true); // Stato di caricamento

  // Funzione per recuperare i dati dal server (simulato qui)
    const aggiornaStato = async () => {
        setLoading(true);
        try {
        //mettiamo qui il codice per recuperare i dati dal server
        gestioneOrdini.orderStatus().then((risposta)=>{
            console.log("risposta",risposta)
            let obj = {latitude: risposta.Drone.lat, longitude: risposta.Drone.lng}
            setDrone(obj)
            setStato(risposta.Stato)
            if(risposta.Stato == "COMPLETED"){
                setOutput(<Text>
                    <Text style={{ color: '#FF7300' , fontWeight: '500'}}>Consegnato alle: {risposta.Tempo.Ora} del {risposta.Tempo.Data}</Text> 
                    {' '}
                  </Text>)
            }else{
                setOutput(<Text>
                    In consegna tra: <Text style={{ color: '#FF7300', fontWeight: '500' }}>{risposta.Tempo} minuti</Text> 
                    {' '}
                  </Text>)
            }
        }).catch((error)=>{
            console.log("errore da orderstatus delivery",error)
        })
        } catch (error) {
        console.error('Errore nel aggiornamento stato', error);
        } finally {
        setLoading(false);
        }
    };

  // useEffect per ricaricare i dati ogni 5 secondi
    useEffect(() => {
        console.log("finito? ",finito)
        if (finito){
            return;
        }
        console.log("stato? ",stato)
        if (stato == "COMPLETED"){
            setFinito(true)
            return;
        }

        aggiornaStato(); // Prima chiamata all'avvio

        const interval = setInterval(() => {
        aggiornaStato(); // Ricarica ogni 5 secondi
        }, 5000);

        return () => clearInterval(interval); // Pulisce il timer quando il componente si smonta
    }, [stato, finito]);


    if (drone!=undefined, partenza != undefined, destinazione != undefined){
        console.log("posizione2",partenza,destinazione,drone)
        return(
            <View style={styles.container}>
                <View style={styles.containerMap}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: partenza.latitude, // Centro tra Milano e Torino
                            longitude: partenza.longitude,
                            latitudeDelta: 0.3, // Zoom ampio per vedere entrambi i punti
                            longitudeDelta: 0.3,
                        }}
                    >
                        <Marker
                            title="Partenza"
                            coordinate={partenza} >
                        </Marker>
                        <Marker
                            title="Destinazione"
                            coordinate={destinazione}
                            pinColor='green'    
                        >   
                        </Marker>
                        <Marker
                            title="Drone"
                            coordinate={drone}
                            //pinColor='blue'
                            image={require('../assets/DroneLogo.png')}
                        >   
                        </Marker>
                        <Polyline
                            coordinates={[partenza, drone]} // Da Milano a Torino
                            strokeColor="#8200FD" // Colore della linea
                            strokeWidth={6} // Spessore della linea
                            
                        />
                        <Polyline
                            coordinates={[drone, destinazione]} // Da Milano a Torino
                            strokeColor="#8200FD" // Colore della linea
                            strokeWidth={6} // Spessore della linea
                            lineDashPattern={[5,10]}
                        />
                    </MapView>
                    <TouchableOpacity onPress={() => navigate("Home")} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerDescrizione}>
                    <Text style={styles.statoConsegna}>{output}</Text>
                    <LastOrderView />

                    {finito && <TouchableOpacity style={styles.buyButton} onPress={()=>{
                        gestioneOrdini.confermaConsegna();
                        navigate("Home")
                    }}>
                        <Text style={styles.confirmText}>Conferma ricezione</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerMap: {
        flex: 1
        
    },
    containerDescrizione:{
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '30%',
        borderTopLeftRadius: 50 ,
        borderTopRightRadius: 50,
        backgroundColor: 'rgb(255, 255, 255)',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 80
        
        /*shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5*/
    }
    ,map: {
        width: '100%',
        height: '100%',
    },
    markerContainer: {
      width: 50, // 📌 Dimensione del marker
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
  },
    markerImage: {
        width: 40, // 📌 Ridimensiona l'immagine
        height: 40,
        resizeMode: "contain", // Assicura che l'immagine mantenga le proporzioni
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        //padding: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.91)',
        alignItems:'center',
        //justifyContent: 'center'
    },
    backText: {
        fontSize: 30,
        color: "#FF7300",
        fontWeight: "bold",
        //margin: 'auto'
    },
    statoConsegna:{
        color: '#878787',
        fontSize: 20,
        marginTop: 12,
        marginBottom: 10,
        fontWeight: '500'
    },
    buyButton: {
        height: 50,
        width: "90%",
        backgroundColor: "#FF8C00",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        //marginTop: 10,
    },
    confirmText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
});