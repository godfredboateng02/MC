import { Text, View, StyleSheet} from 'react-native'

export default function LoadingView(){
    return(
        <View>
            <Text>Schermata di caricamento</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})