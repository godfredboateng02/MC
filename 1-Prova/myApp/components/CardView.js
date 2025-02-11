import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default function CardView({dati}){

    const maskCardNumber = (cardNumber) => {
        console.log()
        return cardNumber.replace(/\d(?=\d{4})/g, "*"); // Sostituisce tutti i numeri tranne gli ultimi 4
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => console.log("Carta cliccata")}>
            <Text style={styles.cardBrand}>Visa</Text>

            <View style={styles.cardRow}>
                <View>
                    <Text style={styles.label}>Card number</Text>
                    <Text style={styles.cardNumber}>{maskCardNumber(dati.cardNumber)}</Text>
                </View>
                <View>
                    <Text style={styles.label}>CVV</Text>
                    <Text style={styles.cvv}>{dati.cardCVV}</Text>
                </View>
            </View>

            <View style={styles.cardRow}>
                <View>
                    <Text style={styles.label}>Expire Date</Text>
                    <Text style={styles.expireDate}>{dati.cardExpireMonth}/{dati.cardExpireYear}</Text>
                </View>
                <Text style={styles.cardHolder}>{dati.cardFullName}</Text>
            </View>
        </TouchableOpacity>
    );
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
        elevation: 5,
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
        color: "#B0BEC5",
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
    }
});