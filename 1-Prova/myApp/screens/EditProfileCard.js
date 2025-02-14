import {Text, View, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native'
import {useState , useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import gestioneAccount from '../viewmodel/gestioneAccount';
import { navigate } from '../NavigationService';

export default function EditProfileCard(){

    const navigation = useNavigation();

    //TO-DO: 
    const route = useRoute();
    const { datiCarta } = route.params || {};

    const [cardFullName, setCardFullName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpireMonth, setCardExpireMonth] = useState("")
    const [cardExpireYear, setCardExpireYear] = useState("")
    const [cardCVV, setCardCVV] = useState("")

    //TO-DO: (VIEWMODEL) mi serve una chiamata personalizzata per la modifica solamente dei dati della carta e non del nome e cognome
    //nomeChiamata: updateUserName({Nome: " ", Cognome:" "})
    /*useEffect(()=>{
        setCardFullName(datiCarta.cardFullName)
        setCardNumber(datiCarta.cardNumber)
        setCardExpireMonth(datiCarta.cardExpireMonth)
        setCardExpireYear(datiCarta.cardExpireYear)
        setCardCVV(datiCarta.cardCVV)
    },[])*/

    const onEdit = (card) =>{
        //console.log("onEdit",card)
        gestioneAccount.updateUserCard(card).then(()=>{
            console.log("aggiornato dati carta")
            navigate("Profile")
        }).catch((error)=>{
            console.log("errore aggiornamento dati",error)
        })
    }

    // Funzione per gestire il cambiamento del numero di carta e inserire spazi
    const handleCardNumberChange = (text) => {
        let cleaned = text.replace(/\D/g, '').substring(0, 16); // Rimuove tutto tranne numeri e limita a 16 cifre
        let formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim(); // Aggiunge spazio ogni 4 cifre
        setCardNumber(formatted);
        console.log(formatted)
    };

    const isValid = () => {
        return (
            cardFullName.length > 0 && cardFullName.length <= 31 &&
            /^[0-9]{16}$/.test(cardNumber.replace(/\s/g, '')) &&
            /^[1-9]$|^1[0-2]$/.test(cardExpireMonth) &&
            /^[2-9][0-9]{3}$/.test(cardExpireYear) && cardExpireYear >= 2000 &&
            /^[0-9]{3}$/.test(cardCVV)
        );
    };

    /*
    TO-DO: (VIEW) posso usarla solamente dopo aver effettuato la chiamata di rete alla viewModel, per modificare i dati della carta
    //nomeChiamata: updateUserCard({Titolare: " ", Numero:" ", Mese: " ", Anno: " ", Cvv:" "})
    useEffect(()=>{
        fetchData(41719).then((result)=>{
            setLastName(result.lastName)
            setFirstName(result.firstName)
            setCardFullName(result.cardFullName)
            setCardNumber(result.cardNumber)
            setCardExpireMonth(result.cardExpireMonth)
            setCardExpireYear(result.cardExpireYear)
            setCardCVV(result.cardCVV)
        }).then((error)=>{
            console.log(error)
        })
    },[])

    */

    //FUNZIONE PER VALIDARE I PROPRI DATI INSERITI



    return (
        <View style={styles.container}>
            {/* HEADER ARANCIONE */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
                    onChangeText={(text) => text.length <= 31 && setCardFullName(text)}
                    placeholder='es. Mario Rossi'
                />

                <Text style={styles.label}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={16} //aggiunge i 3 spazi tra i numeri per migliorare lettura
                />

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
                <TouchableOpacity style={styles.confirmButton} onPress={() => onEdit({Carta: {Titolare: cardFullName, Numero: cardNumber, Mese: cardExpireMonth, Anno: cardExpireYear, Cvv: cardCVV}})}>
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
        //justifyContent: 'center',
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
        fontWeight: "light",
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
        marginBottom: 20,
        color: '#888888'
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
        marginTop: 20,
    },
    confirmText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});