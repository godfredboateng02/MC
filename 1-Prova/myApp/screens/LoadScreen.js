import {Text, View, StyleSheet} from 'react-native'

export default function LoadScreen(){
    return(
        <View>
            <Text>Caricamento dei dati</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})