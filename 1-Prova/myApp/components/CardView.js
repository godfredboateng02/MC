import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default function CardView({dati}){

    if (!dati || !dati.Carta) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nessuna Carta Inserita</Text>
            </View>
        );
    }else{
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => console.log("Carta cliccata")}>
                <Text style={styles.cardBrand}>Visa</Text>
    
                <View style={styles.cardRow}>
                    <View>
                        <Text style={styles.label}>Card number</Text>
                        <Text style={styles.cardNumber}>**** **** **** {dati.Carta.Numero}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>CVV</Text>
                        <Text style={styles.cvv}>***</Text>
                    </View>
                </View>
    
                <View style={styles.cardRow}>
                    <View>
                        <Text style={styles.label}>Expire Date</Text>
                        <Text style={styles.expireDate}>{dati.Carta.Mese}/{dati.Carta.Anno}</Text>
                    </View>
                    <Text style={styles.cardHolder}>{dati.Carta.Titolare}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

// STILI PER LA CARTA DI CREDITO
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#1E88E5", 
        padding: 20,
        borderRadius: 15,
        width: 350,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    cardBrand: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    label: {
        color: "#fff",
        fontSize: 14,
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 2,
    },
    cvv: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    expireDate: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    cardHolder: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
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