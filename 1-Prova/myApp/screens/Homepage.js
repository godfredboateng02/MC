import { Text, View, StyleSheet, Button, ImageComponent, TouchableOpacity, Image} from 'react-native'
import { navigate } from '../NavigationService'
import MenuListView from '../components/MenuListView';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import gestioneMenu from '../viewmodel/gestioneMenu';
import DeliveryElement from '../components/DeliveryElement';
import gestioneOrdini from '../viewmodel/gestioneOrdini';

export default function HomeScreen(){

    const navigation = useNavigation();

    const [cardPressed, setCardPressed] = useState()


    const [menuList, setMenuList] = useState()

    const [consegnaInCorso, setConsegnaInCorso] = useState(false); // Stato per la consegna in corso


    useEffect(()=>{
        gestioneMenu.lista().then((risposta)=>{
            
            setMenuList(risposta)
        })
    },[])

    useEffect(() => {
        const checkConsegnaInCorso = async () => {
            const risultato = await gestioneOrdini.consegnaInCorso();
            console.log("Consegna",risultato)
            setConsegnaInCorso(risultato); // Imposta lo stato in base alla risposta
        };

        checkConsegnaInCorso();
    }, []);

    const handleCardPress = (mid) => {
        console.log("card premuta", mid)
        setCardPressed(mid);
        navigate("MenuDetail",{ menuId: mid })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>I nostri menu</Text>
                <Text style={styles.position}></Text>
                <TouchableOpacity onPress={() => navigate("Profile")}>
                    <Image 
                        source={require('../assets/Logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View> 
            <MenuListView menu={menuList} onCardPress={handleCardPress}/>

            {consegnaInCorso && (
                <View style={styles.delivery}>
                    <DeliveryElement />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: "row", // Dispone titolo e logo sulla stessa riga
        justifyContent: "space-between", // Li posiziona ai lati opposti
        alignItems: "center", // Li allinea verticalmente
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#FF8C00",
    },
    menuContainer:{
        gap: 10
    },
    logo:{
        top: 15,
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    delivery: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 100,
    },
})