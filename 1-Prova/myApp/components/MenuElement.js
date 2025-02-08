import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MenuImageView from './MenuImageView';

export default function MenuElement({menu}){

    console.log(menu);

    return(
        <View style={styles.container}>
            {/*<Image style={styles.cardImage}source={require('../assets/menu.jpg')} />*/}
            <MenuImageView menu={menu}/>
            <Text style = {styles.cardTitle}>{menu.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={3} ellipsizeMode='tail'>{menu.shortDescription}</Text>
            <View style={styles.row}>
                <Text style={styles.price}>{menu.price},99€</Text>
                <Text style={styles.time}>{menu.deliveryTime} min ⏱️</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        //borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        margin: 5,
        width: 180,
        
        borderRadius: 10,
    },
    cardTitle:{
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#ff6600',  

    },
    cardImage:{
        width: 176,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardDescription:{
       //alignSelf: 'center',
        textAlign: 'center',
        marginTop : 5,
        marginHorizontal: 2,
        lineHeight: 15,
        color: '#666666',
    },
    row: {
        flexDirection: 'row', // Disposizione orizzontale
        justifyContent: 'space-between', // Distribuzione tra gli estremi // Distanza dalla riga precedente
        marginTop: 5, // Distanza dalla riga precedente
        marginHorizontal: 10, // Margini laterali
        marginBottom: 10,
    },
    price:{
        fontSize: 22,
        fontWeight: '500',
        color: '#007700',
        
    },
    time:{
        marginTop: 5,
        fontSize: 15,
        color: '#ff6600',
    },
});