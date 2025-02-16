import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import { fetchImage } from '../viewmodel/MenuImageLoader';



export default function MenuImageView({menu}){
    
    const [image, setImage] = useState(null);
    

    return(
        <View>
            <Image style={styles.cardImage} source={{uri: "data:image/png;base64,"+menu.Immagine}} />
        </View>
    );
}
const styles = StyleSheet.create({
    cardImage:{
        width: 176,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});