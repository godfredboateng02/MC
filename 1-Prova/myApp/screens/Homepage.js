import { Text, View, StyleSheet, Button, ImageComponent} from 'react-native'
import { navigate } from '../NavigationService'
import MenuListView from '../components/MenuListView';
import { useEffect, useState } from 'react';
import { fetchMenu } from '../viewmodel/MenuViewModel';
import { useNavigation } from '@react-navigation/native';

export default function Homepage(){

    const navigation = useNavigation();

    //questa è una funzione asincrona e quindi deve essere gestita in un altro modo
    const [cardPressed, setCardPressed] = useState()
    const [menuList, setMenuList] = useState();

    /*useEffect(() => {
        CommunicationController.getMenus().then((menuList1) => {
            setMenuList(menuList1);
            console.log('dati caricati');
        }).catch((error)=>{
            console.log("errore:",error)
        })
    }, []);*/

    useEffect(()=>{
        fetchMenu().then((menus)=>{
            setMenuList(menus)
            console.log("menu preso...")
        })
    },[])

    const handleCardPress = (menu) => {
        console.log("card premuta", menu)
        setCardPressed(menu);
        navigate("MenuDetail",{ menuId: menu.mid })
    }

    return (
        <View style={styles.container}>
          <MenuListView menu={menuList} onCardPress={handleCardPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})