import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default function CardView(){

    //TO-DO i dati devono essere passati tramite props
    const DatiCarta = {
        cardFullName: 'Mario Rossi',
        cardNumber: '1032 3425 5455 5453', //mi servirebbe non in chiaro ma con gli asterischi per i numeri dal 1 al 14 
        cardExpireMonth: '10',
        cardExpireYear: '2024',
        cardCVV: '***'
    }

    const maskCardNumber = (cardNumber) => {
        return cardNumber.replace(/\d(?=\d{4})/g, "*"); // Sostituisce tutti i numeri tranne gli ultimi 4
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => console.log("Carta cliccata")}>
            <Text style={styles.cardBrand}>Visa</Text>

            <View style={styles.cardRow}>
                <View>
                    <Text style={styles.label}>Card number</Text>
                    <Text style={styles.cardNumber}>{DatiCarta.cardNumber}</Text>
                </View>
                <View>
                    <Text style={styles.label}>CVV</Text>
                    <Text style={styles.cvv}>{DatiCarta.cardCVV}</Text>
                </View>
            </View>

            <View style={styles.cardRow}>
                <View>
                    <Text style={styles.label}>Expire Date</Text>
                    <Text style={styles.expireDate}>{DatiCarta.cardExpireMonth}/{DatiCarta.cardExpireYear}</Text>
                </View>
                <Text style={styles.cardHolder}>{DatiCarta.cardFullName}</Text>
            </View>
        </TouchableOpacity>
    );
}

// STILI PER LA CARTA DI CREDITO
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#1E88E5", // Blu simile alla carta in foto
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
        fontSize: 20,
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