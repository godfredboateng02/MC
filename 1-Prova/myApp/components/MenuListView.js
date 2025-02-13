import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import MenuElement from './MenuElement';

export default function MenuListView({menu, onCardPress}){
    
    return(
        <View style={styles.container}>
            <FlatList 
                data = {menu}
                renderItem = {({item}) => <TouchableOpacity onPress = {()=>onCardPress(item.Mid)}><MenuElement menu={item} /></TouchableOpacity>}
                keyExtractor = {(item) => item.Mid}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                contentContainerStyle={{paddingBottom: 50}} //serve per mettere lo spazio alla fine della Flatlist
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    sectionTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});