import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import gestioneMenu from '../viewmodel/gestioneMenu';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import gestioneAccount from '../viewmodel/gestioneAccount';

export default function MenuDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const { menuId } = route.params;

    const [menuDetail, setMenuDetail] = useState(null);
    const [userCard, setUserCard] = useState(null);
    const [ordineInCorso, setOrdineInCorso] = useState(false);
    const [buttonAction, setButtonAction] = useState(null);
    const [buttonText, setButtonText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Recupero i dettagli del menu
    useEffect(() => {
        gestioneMenu.menuDetail(menuId)
            .then((risposta) => setMenuDetail(risposta))
            .catch((error) => console.log("Errore menuDetail:", error));
    }, [menuId]);

    // Recupero i dati utente e stato ordine
    useEffect(() => {
        Promise.all([
            gestioneAccount.getUserData(),
            gestioneOrdini.orderStatus()
        ])
        .then(([datiUtente, statoOrdine]) => {
            console.log("Dati utente:", datiUtente);
            setUserCard(datiUtente?.Carta);
            console.log("Stato ordine:", statoOrdine);
            setOrdineInCorso(statoOrdine?.Stato === "ON_DELIVERY");
            setIsLoading(false);
        })
        .catch((error) => {
            console.log("Errore durante il recupero dei dati:", error);
            setIsLoading(false);
        });
    }, []);

    // Imposta dinamicamente il comportamento del pulsante solo dopo aver caricato tutto
    useEffect(() => {
        if (!isLoading && menuDetail) {
            if (!userCard) {
                setButtonAction(() => vaiAllaCarta);
                setButtonText("Inserisci carta per ordinare");
            } else if (ordineInCorso) {
                setButtonAction(() => vaiAllOrdineInCorso);
                setButtonText("Ordine in corso - Visualizza stato");
            } else {
                setButtonAction(() => onBuy);
                setButtonText(`Effettua ordine ${menuDetail?.Prezzo ?? ''}€`);
            }
        }
    }, [isLoading, userCard, ordineInCorso, menuDetail]);

    // Funzione per effettuare l'ordine
    const onBuy = () => {
        gestioneOrdini.effettuaOrdine(menuId)
            .then(() => {
                console.log("Ordine effettuato");
                navigation.goBack();
            })
            .catch((error) => console.log("Errore da onBuy:", error));
    };

    // Funzione per andare alla pagina di inserimento carta
    const vaiAllaCarta = () => {
        navigation.navigate("EditProfileCard");
    };

    // Funzione per gestire l'ordine in corso
    const vaiAllOrdineInCorso = () => {
        console.log("Vado alla pagina dell'ordine in corso");
    };

    // Controllo caricamento dati
    if (!menuDetail || isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Caricamento...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Pulsante per tornare indietro */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            {/* Immagine grande */}
            <Image
                style={styles.menuImage}
                source={{ uri: "data:image/png;base64," + menuDetail.Immagine }}
            />

            {/* Area contenente le informazioni */}
            <View style={styles.detailContainer}>
                <Text style={styles.menuTitle}>{menuDetail.Nome}</Text>
                <Text style={styles.sectionTitle}>Descrizione Completa</Text>
                <Text style={styles.description}>{menuDetail.Descrizione}</Text>
                <Text style={styles.price}>{menuDetail.Prezzo}€</Text>
                <Text style={styles.deliveryTime}>*Tempo di consegna stimato: {menuDetail.Tempo} min</Text>

                {/* Pulsante dinamico */}
                <TouchableOpacity
                    style={[styles.confirmButton, ordineInCorso && styles.disabledButton]}
                    onPress={buttonAction}
                    disabled={ordineInCorso}
                >
                    <Text style={styles.confirmText}>{buttonText}</Text>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        padding: 10,
        zIndex: 10,
    },
    backText: {
        fontSize: 30,
        color: "#000",
        fontWeight: "bold",
    },
    menuImage: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
    },
    detailContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    menuTitle: {
        fontSize: 33,
        fontWeight: "bold",
        color: "#FF8C00",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FF8C00",
        marginTop: 40,
    },
    description: {
        fontSize: 15,
        color: "#666",
        marginTop: 5,
        textAlign: "justify",
    },
    price: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#2ECC71",
        textAlign: "center",
        marginTop: 40,
    },
    deliveryTime: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        position: "absolute",
        bottom: 100,
        left: 10,
        right: 10,
    },
    confirmButton: {
        position: "absolute",
        marginHorizontal: '10%',
        bottom: 40,
        width: "90%",
        backgroundColor: "#FF8C00",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    confirmText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    disabledButton: {
        backgroundColor: "#888",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
