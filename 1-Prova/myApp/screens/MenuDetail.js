import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function MenuDetail(){
    const navigation = useNavigation();

    /**
    nomeChiamata:UserData()
    
    TO-DO: userò la stessa chiamata di rete della getUser per vedere se i dati della carta sono
    stati inseriti e che quindi posso cliccare il pulsante acquista, altrimenti il pulsante mi
    rimanda alla schermata di inserimento dei dati della carta
    */

    /*
    nomeChiamata: DettaglioMenu(mid)

    TO-DO: mi serve la chiamata di rete al dettaglio del menu selezionato che mi restituisce
    un oggetto con:
        - Nome:
        - DescrizioneLunga:
        - Prezzo:
        - TempoDiConsegna (*vediamo dopo)
        - Immagine
        - Ingredienti (*facoltativo)
    */

    const route = useRoute();
    const { menuId } = route.params; // Recupera il menuId passato

    //TO-DO: (viewmodel) i dettagli del menu li ricevo tramite una chiamata di rete dove indico la MID]
    const MenuDetail = {
        mid: 0,
        name: "Pizza Margherita",
        price: 5,
        location: {
            "lat": 45.4642,
            "lng": 9.19
        },
        imageVersion: 0,
        shortDescription: "Pizza con pomodoro, mozzarella e basilico.",
        deliveryTime: 30,
        longDescription: "Pizza con pomodoro, mozzarella e basilico, cotta in forno a legna."
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text>MenuDetail: {menuId}</Text>
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
        top: 50,
        left: 10,
        padding: 10,
        borderRadius: 70,
        alignItems: 'center'
    },
    backText: {
        fontSize: 40,
    },
})