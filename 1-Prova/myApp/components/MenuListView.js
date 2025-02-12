import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import MenuElement from './MenuElement';

export default function MenuListView({menu, onCardPress}){
    
    return(
        <View style={styles.container}>
            <FlatList 
                data = {menu}
                renderItem = {({item}) => <TouchableOpacity onPress = {()=>onCardPress(item)}><MenuElement menu={item} /></TouchableOpacity>}
                keyExtractor = {(item) => item.Mid}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        //nulla per ora
        
    },
    sectionTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});