import { Text, View, StyleSheet} from 'react-native'

export default function Delivery(){
    return(
        <View style={styles.container}>
            <Text>Delivery</Text>
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