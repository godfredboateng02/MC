import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import gestioneMenu from '../viewmodel/gestioneMenu';
import gestioneOrdini from '../viewmodel/gestioneOrdini';
import gestioneAccount from '../viewmodel/gestioneAccount';
import { navigate } from '../NavigationService';
import ErrorDialog from '../components/ErrorDialog';

export default function MenuDetail() {
    const [error, setError] = useState(null); // Stato per gestire l'errore

    const navigation = useNavigation();
    const route = useRoute();
    const { menuId } = route.params;

    const [menuDetail, setMenuDetail] = useState(null);
    const [Carta, setCarta] = useState(1)
    const [ordineInCorso, setOrdineInCorso] = useState(false)
    const [buttonText, setButtonText] = useState("") //testo del bottone
    const [buttonAction, setButtonAction] = useState() //funzione da eseguire
    const [shouldRenderAgain, setShouldRenderAgain] = useState(false);


    useEffect(() => {
        gestioneMenu.menuDetail(menuId).then((risposta) => {
            setMenuDetail(risposta)
        }).catch((error) => {
            console.log("Errore menuDetail:", error)
        });

        gestioneAccount.getUserData().then((risposta)=>{
            //console.log("Carta:",risposta.Carta)
            setCarta(risposta.Carta)
        }).catch((error)=>{
            console.log("Errore nel recupero dati carta",error)
        })

        gestioneOrdini.consegnaInCorso().then((risposta)=>{
            setOrdineInCorso(risposta)
            console.log("ordineinCorso1",risposta)
        }).catch((error)=>{
            console.log("Errore nel recupero dell'ordine in corso")
        })

        setTimeout(()=>{
            setShouldRenderAgain(true)
        },1000)

    },[]);

    

    useEffect(()=>{
        if (shouldRenderAgain){
            console.log(Carta, ordineInCorso)
            if (Carta === null){
                setButtonText("Inserisci i dati della carta")
                setButtonAction(()=>onAdd)
            }else if (ordineInCorso){
                setButtonText("C'è già un ordine in corso")
                setButtonAction(()=>onDelivery)
            }else{
                setButtonText("Acquista il menu")
                setButtonAction(()=>onBuy)
            }
            
        }
    },[Carta,ordineInCorso,shouldRenderAgain])

    const handleErrorConfirm = () => {
        console.log("Eseguo azione dopo l'errore...");
        // Esempio: Naviga a un'altra schermata
          navigation.navigate("EditProfileCard");
        };

    const onBuy = () => {
        gestioneOrdini.effettuaOrdine(menuId).then((risultato) => {
                console.log("Ordine effettuato");
                navigate("Delivery",{risultato: risultato});
        }).catch((error) => {
            setError("inserisci una carta valida").then(()=>{
                navigate("MenuDetail",{menuId: menuId})
            })
        });
    };

    const onAdd = () => {
        navigate("EditProfileCard")
    }

    const onDelivery = () => { 
        navigate("Home")
        gestioneOrdini.orderStatus().then((risultato)=>navigate("Delivery",{risultato: risultato}))}
    

    const onPress2 = () => {
        if (buttonAction){
            buttonAction()
        }
    }

    return (
        <View style={styles.container}>
            {/* Pulsante per tornare indietro */}
            <TouchableOpacity onPress={() => navigate("Home")} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            {/* Immagine grande */}
            <Image
                style={styles.menuImage}
                source={{ uri: "data:image/png;base64," + menuDetail?.Immagine }}
            />

            {/* Area contenente le informazioni */}
            <View style={styles.detailContainer}>
                <Text style={styles.menuTitle}>{menuDetail?.Nome}</Text>
                <Text style={styles.sectionTitle}>Descrizione Completa</Text>
                <Text style={styles.description}>{menuDetail?.Descrizione}</Text>
                <Text style={styles.price}>{menuDetail?.Prezzo}€</Text>
                <Text style={styles.deliveryTime}>*Tempo di consegna stimato: {menuDetail?.Tempo} min</Text>

                {/* Pulsante dinamico */}
                <TouchableOpacity style={styles.buyButton} onPress={()=>{
                    console.log("bottone premuto");
                    onPress2()
                }}>
                    <Text style={styles.confirmText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
            <ErrorDialog
                isVisible={!!error} // Mostra il dialogo solo se `error` non è null
                message={error}
                onClose={() => setError(null)} // Chiude il dialogo
                onConfirm={handleErrorConfirm} // Azione personalizzata
            />
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
        //borderTopLeftRadius: 60,
        //borderTopRightRadius: 60,
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
    buyButton: {
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
