import { Text, View, StyleSheet, Image} from 'react-native'

export default function LastOrderView({lastMenu}){
    /*TO-DO: prendo tramite le  il lastOid e faccio una chiamata di rete 
        Nome piatto
        Descrizione breve
        Prezzo
        Immagine


        Data di ordine: formattato in giorno n°giorno mese, ora
    */

    if (!lastMenu) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nessun ordine ancora registrato</Text>
            </View>
        );
    }

    return (
        <View style={styles.cardContainer}>
            {/* Immagine a sinistra */}
            <Image 
                source={require('../assets/menu.png')} // Sostituisci con il percorso corretto dell'immagine
                style={styles.cardImage}
                resizeMode="cover"
            />

            {/* Contenuto testuale a destra */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{lastMenu.Nome}</Text>
                <Text style={styles.description}>{lastMenu.Descrizione}</Text>
                <Text style={styles.price}>€ {lastMenu.Prezzo}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row", // Dispone gli elementi in orizzontale
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: "center",
    },
    cardImage: {
        width: 100, // Imposta la larghezza dell'immagine
        height: 100, // Imposta l'altezza dell'immagine
        borderRadius: 10,
    },
    textContainer: {
        flex: 1, // Occupa tutto lo spazio disponibile
        marginLeft: 15, // Spazio tra immagine e testo
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555555",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 13,
        marginTop: 3
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        color: "#009436",
    },
    emptyContainer: {
        padding: 20,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
    },
});