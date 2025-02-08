import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import MenuElement from './MenuElement';

export default function MenuListView({menu, onCardPress}){
    return(
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>I nostri menu</Text>
            <FlatList 
                data = {menu}
                renderItem = {({item}) => <TouchableOpacity onPress = {()=>onCardPress(item)}><MenuElement menu={item} /></TouchableOpacity>}
                keyExtractor = {(item) => item.mid}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20
    },
    sectionTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: -200,
    }
});