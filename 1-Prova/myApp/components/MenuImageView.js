import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import { fetchImage } from '../viewmodel/MenuImageLoader';



export default function MenuImageView({menu}){
    
    const [image, setImage] = useState(null);
    //const imagePrefix = "data:image/png;base64,";

    /*useEffect(() => {
        CommunicationController.getMenuImage(menu.mid).then((image) => {
            console.log("richiesta immagine")
            setImage(imagePrefix+""+image.base64);
        }).catch((error) => {
            console.log(error);
        });
    }); */


    /*useEffect(() => {
        fetchImage(menu).then((image) => {
            //setImage(image.base64);
            setImage(image);
        }).catch((error) => {
            console.log("Errore del",error);
        });
    }, []);*/

    //console.log("Image:",image);

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