import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardView from '../components/CardView';
import LastOrderView from '../components/LastOrderView';

export default function Profile() {
    const navigation = useNavigation();

    //TO-DO: questi dati devono essere ottenuti tramite una chiamata getUser alla viewmodel e poi passati alle componenti come props
    const Dati = {
        firstName: 'Mario',
        lastName: 'Rossi',
        cardFullName: 'Mario Rossi',
        cardNumber: '1032342554555453',
        cardExpireMonth: '10',
        cardExpireYear: '2024',
        cardCVV: '123',
        lastOid: 0
    }

    //TO-DO: questo dato deve essere ottenuto tramite una chiamata alla vie

    //TO-DO: manca il costrutto di selezione che se vede che la carta non è caricata scrive nessuna carta

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
                <Text style={styles.firstlastName}>{Dati.lastName} {Dati.firstName}</Text>
            </View>
        
            
            <Text style={styles.title}>La mia carta</Text>
            <CardView dati={Dati}/>

            <Text style={styles.title}>Ordine Recente</Text>
            <View style={styles.lastOrderContainer}>
                <LastOrderView lastOid={Dati.lastOid}/>
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
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 16,
        marginTop: 30,
        marginBottom: 10,
        color: '#FF8C00'
    },
    lastOrderContainer: {
        alignItems: 'center'
    }
});
