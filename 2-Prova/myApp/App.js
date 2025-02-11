import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function App() {
    // Definizione delle coordinate per i due marker
    const startLocation = { latitude: 45.4642, longitude: 9.1900 }; // Milano
    const endLocation = { latitude: 45.4703, longitude: 9.1869 };  // Torino

    return (
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
                {/* Marker Iniziale */}
                <Marker coordinate={startLocation} title="Milano" pinColor="red" />
                
                {/* Marker Finale */}
                <Marker coordinate={endLocation} /*title="Torino" pinColor="#00ff00">*/ >
                <View style={styles.markerContainer}>
                    <Image 
                        source={require('./assets/drone.png')} 
                        style={styles.markerImage} 
                    />
                </View>
                </Marker>

                {/* Traccia una linea tra Milano e Torino */}
                <Polyline
                    coordinates={[startLocation, endLocation]} // Da Milano a Torino
                    strokeColor="blue" // Colore della linea
                    strokeWidth={4} // Spessore della linea
                    lineDashPattern={[5,10]}
                />
            </MapView>
        </View>
    );
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
});