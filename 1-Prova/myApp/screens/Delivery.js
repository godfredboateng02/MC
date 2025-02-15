/*import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import LastOrderView from '../components/LastOrderView'
import { navigate } from '../NavigationService'
import { useNavigation } from '@react-navigation/native';

export default function Delivery(){

    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigate("Home")} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <LastOrderView />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

})
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { navigate } from '../NavigationService';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Delivery() {
    // Definizione delle coordinate per i due marker
    //const startLocation = { latitude: 45.4642, longitude: 9.1900 }; // Milano
    //const endLocation = { latitude: 45.4703, longitude: 9.1869 };  // Torino

    const navigation = useNavigation()
    const route = useRoute()
    const { risultato } = route.params;

    const [partenza, setPartenza] = useState({latitude: risultato.Partenza.lat, longitude: risultato.Partenza.lng})
    const [destinazione, setDestinazione] = useState({latitude: risultato.Destinazione.lat, longitude: risultato.Destinazione.lng})
    const [drone, setDrone] = useState({latitude: risultato.Partenza.lat, longitude: risultato.Partenza.lng})
    

    useEffect(()=>{
        gestioneOrdini.orderStatus().then((risposta)=>{
            console.log("risposta",risposta)
            //let obj = {latitude: risposta.Drone.lat, longitude: risposta.Drone.lng}
            //setDrone()
        }).catch((error)=>{
            console.log("errore da orderstatus delivery",error)
        })
    },[])

    /*return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 45.465, // Centro tra Milano e Torino
                    longitude: 9.19,
                    latitudeDelta: 1, // Zoom ampio per vedere entrambi i punti
                    longitudeDelta: 1,
                }}
            >
                
                <Marker coordinate={partenza} title="Milano" pinColor="red" />
                
                
                <Marker coordinate={destinazione} >
                <View style={styles.markerContainer}>
                    <Image 
                        source={require('../assets/drone.png')} 
                        style={styles.markerImage} 
                    />
                </View>
                </Marker>

                
                <Polyline
                    coordinates={[partenza, destinazione]} // Da Milano a Torino
                    strokeColor="blue" // Colore della linea
                    strokeWidth={4} // Spessore della linea
                    lineDashPattern={[5,10]}
                />
            </MapView>

            <TouchableOpacity onPress={() => navigate("Home")} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
        </View>
    );*/


    if (drone!=undefined){
        console.log("posizione2",partenza,destinazione,drone)
        return(
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 45.583, // Centro tra Milano e Torino
                        longitude: 9.19,
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
                        strokeColor="8200FD" // Colore della linea
                        strokeWidth={6} // Spessore della linea
                        lineDashPattern={[10,5]}
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
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
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
        backgroundColor: 'rgba(255, 255, 255, 0.83)',
        alignItems:'center',
        //justifyContent: 'center'
    },
    backText: {
        fontSize: 30,
        color: "#FFC800",
        fontWeight: "bold",
    },
});