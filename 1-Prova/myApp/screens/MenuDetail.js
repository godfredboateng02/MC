import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import gestioneMenu from '../viewmodel/gestioneMenu';
import gestioneOrdini from '../viewmodel/gestioneOrdini';

export default function MenuDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const { menuId } = route.params; // Recupera il menuId passato
    const [menuDetail, setMenuDetail] = useState(null);

    useEffect(() => {
        gestioneMenu.menuDetail(menuId).then((risposta) => {
            //console.log("-->", risposta);
            setMenuDetail(risposta);
        }).catch((error) => {
            console.log("errore menuDetail", error);
        });
    }, []);

    if (!menuDetail) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Caricamento...</Text>
            </View>
        );
    }

    const onBuy = (mid) => {
        gestioneOrdini.effettuaOrdine(mid).then(()=>{
            console.log("ordine effettuato")
            navigation.goBack()
        }).catch((error)=>{
            console.log("errore da onBuy",error)
        })
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

                {/* Pulsante di acquisto */}
                <TouchableOpacity style={styles.confirmButton} onPress={() => onBuy(menuId)}>
                    <Text style={styles.confirmText}>Effettua ordine {menuDetail.Prezzo}€</Text>
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
        height: 300, // Altezza fissa per l'immagine in alto
        resizeMode: "cover",
    },
    detailContainer: {
        flex: 1,
        backgroundColor: "#fff",
         // Sovrapposizione dell'area bianca sopra l'immagine
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Ombra per Android
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
        marginHorizontal: 'auto'
    },
    description: {
        fontSize: 15,
        color: "#666",
        marginTop: 5,
        textAlign: "justify",
        marginHorizontal: 16
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
        right: 10
    },
    confirmButton: {
        position: "absolute",
        marginHorizontal: '10%',
        bottom: 40, // Distanza dal bordo inferiore
        //left: "5%",
        width: "90%", // Occupa quasi tutta la larghezza
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

