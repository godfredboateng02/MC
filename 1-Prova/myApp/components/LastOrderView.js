import { Text, View, StyleSheet} from 'react-native'

export default function LastOrderView({lastOid}){
    return(
        <View>
            <Text>Nessun ordine ancora registrato - OID: {lastOid}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})