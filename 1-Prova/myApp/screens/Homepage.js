import { Text, View, StyleSheet, Button, ImageComponent, TouchableOpacity, Image} from 'react-native'
import { navigate } from '../NavigationService'
import MenuListView from '../components/MenuListView';
import { useEffect, useState } from 'react';
import { fetchMenu } from '../viewmodel/MenuViewModel';
import { useNavigation } from '@react-navigation/native';
import gestioneMenu from '../viewmodel/gestioneMenu';
import DeliveryElement from '../components/DeliveryElement';

export default function HomeScreen(){

    const navigation = useNavigation();

    //questa è una funzione asincrona e quindi deve essere gestita in un altro modo
    const [cardPressed, setCardPressed] = useState()
    //const [menuList, setMenuList] = useState();

    /*
    nomeChiamata:
    DALLA VIEWMODEL ->
    mi serve una chiamata di rete che mi restituisca tutti i menu con
        - Nome del piatto
        - DescrizioneCorta del piatto
        - 
    */

    /*useEffect(() => {
        CommunicationController.getMenus().then((menuList1) => {
            setMenuList(menuList1);
            console.log('dati caricati');
        }).catch((error)=>{
            console.log("errore:",error)
        })
    }, []);*/

    /*useEffect(()=>{
        fetchMenu().then((menus)=>{
            setMenuList(menus)
            console.log("menu preso...")
        })
    },[])*/

    const [menuList, setMenuList] = useState()

    useEffect(()=>{
        gestioneMenu.lista().then((risposta)=>{
            //console.log("(useEffect) menu",risposta)
            setMenuList(risposta)
        })
    },[])

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
                        source={require('../assets/Logo.png')} // Sostituisci con il tuo logo
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View> 
            <MenuListView menu={menuList} onCardPress={handleCardPress}/>

            <View style={styles.delivery}>
                <DeliveryElement />
            </View>
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