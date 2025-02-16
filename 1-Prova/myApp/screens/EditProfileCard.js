import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {useState} from 'react'
import {useRoute, useNavigation} from '@react-navigation/native';
import gestioneAccount from '../viewmodel/gestioneAccount';
import { navigate } from '../NavigationService';

export default function EditProfileCard(){

    const navigation = useNavigation();
    const route = useRoute();
    const { datiCarta } = route.params || {};

    const [cardFullName, setCardFullName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpireMonth, setCardExpireMonth] = useState("");
    const [cardExpireYear, setCardExpireYear] = useState("");
    const [cardCVV, setCardCVV] = useState("");

    const [cardNumberError, setCardNumberError] = useState("");

    // Funzione per aggiornare i dati
    const onEdit = (card) => {
        gestioneAccount.updateUserCard(card)
        .then(() => {
            console.log("aggiornato dati carta");
            navigate("Profile");
        })
        .catch((error) => {
            console.log("errore aggiornamento dati",error);
        });
    };

    // Formatta il numero di carta con spazi ogni 4 cifre (per comodità nella digitazione)
    const handleCardNumberChange = (text) => {
        // Rimuove tutto tranne numeri e limita a 16 cifre
        let cleaned = text.replace(/\D/g, '').substring(0, 16); 
        // Aggiunge spazio ogni 4 cifre
        let formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formatted);
    };

    // Semplice validazione
    const isValid = () => {
        const rawNumber = cardNumber.replace(/\s/g, '');

        // 1) Nome non vuoto
        if (cardFullName.trim().length === 0) return false;
        // 2) Numero carta: 16 cifre e inizia con 1
        if (!/^1\d{15}$/.test(rawNumber)) return false;
        // 3) Mese valido
        const monthNum = parseInt(cardExpireMonth, 10);
        if (!monthNum || monthNum < 1 || monthNum > 12) return false;
        // 4) Anno 4 cifre >= 2000 (esempio)
        if (!/^\d{4}$/.test(cardExpireYear)) return false;
        if (parseInt(cardExpireYear, 10) < 2025) return false;
        // 5) CVV: 3 cifre
        if (!/^\d{3}$/.test(cardCVV)) return false;

        return true;
    };

    // Eventuale messaggio di errore se il numero non è valido
    const getCardNumberError = () => {
        const rawNumber = cardNumber.replace(/\s/g, '');
        if (!rawNumber) return "";
        if (!/^1\d{15}$/.test(rawNumber)) {
            return "Il numero deve essere di 16 cifre e iniziare con '1'.";
        }
        return "";
    };

    const cardNumberErrorMessage = getCardNumberError();

    return (
        <View style={styles.container}>
            {/* HEADER ARANCIONE */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate("Profile")} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerText}>
                    <Text style={styles.lightText}>Profilo</Text> / <Text style={styles.boldText}>Modifica dati carta</Text>
                </Text>
            </View>

            {/* FORM */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Card FullName</Text>
                <TextInput
                    style={styles.input}
                    value={cardFullName}
                    onChangeText={(text) => setCardFullName(text)}
                    placeholder='es. Mario Rossi'
                    maxLength={31}
                />

                <Text style={styles.label}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                />
                {/* Errore sul numero di carta */}
                {cardNumberErrorMessage ? (
                  <Text style={styles.errorText}>{cardNumberErrorMessage}</Text>
                ) : null}

                {/* EXPIRE DATE & CVV */}
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Expire date</Text>
                        <View style={styles.expireContainer}>
                            <TextInput
                                style={[styles.input, styles.expireInput]}
                                keyboardType="numeric"
                                value={cardExpireMonth}
                                onChangeText={setCardExpireMonth}
                                placeholder="MM"
                                maxLength={2}
                            />
                            <TextInput
                                style={[styles.input, styles.expireInput]}
                                keyboardType="numeric"
                                value={cardExpireYear}
                                onChangeText={setCardExpireYear}
                                placeholder="YYYY"
                                maxLength={4}
                            />
                        </View>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.label}>CVV/CVV2</Text>
                        <TextInput
                            style={[styles.input, styles.cvvInput]}
                            keyboardType="numeric"
                            value={cardCVV}
                            onChangeText={setCardCVV}
                            placeholder='123'
                            maxLength={3}
                        />
                    </View>
                </View>

                {/* BOTTONE CONFERMA */}
                <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      { opacity: isValid() ? 1 : 0.5 }
                    ]}
                    disabled={!isValid()}
                    onPress={() => {
                        // 1) Rimuoviamo gli spazi
                        const rawNumber = cardNumber.replace(/\s/g, '');

                        // 2) Passiamo al nostro onEdit
                        onEdit({
                            Carta: {
                                Titolare: cardFullName,
                                Numero: rawNumber, // <--- Qui niente spazi
                                Mese: cardExpireMonth,
                                Anno: cardExpireYear,
                                Cvv: cardCVV
                            }
                        });
                    }}
                >
                    <Text style={styles.confirmText}>Conferma le modifiche</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "#FF8C00",
        height: 100,
        position: 'relative',
        flexDirection: "row",
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
    headerText: {
        fontSize: 18,
        color: "#fff",
        right: -30,
        top: 5
    },
    lightText: {
        fontWeight: "300",
    },
    boldText: {
        fontWeight: "700",
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555555'
    },
    input: {
        borderWidth: 0.8,
        borderColor: "#555555",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 10,
        color: '#888888'
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      fontSize: 14,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        flex: 1,
    },
    expireContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    expireInput: {
        flex: 1,
        marginRight: 10,
    },
    cvvInput: {
        width: 80,
    },
    confirmButton: {
        backgroundColor: "#00C853",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 30,
    },
    confirmText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
