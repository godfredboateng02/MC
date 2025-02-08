import { Text, View, StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native';

export default function MenuDetail(){

    const route = useRoute();
    const { menuId } = route.params; // Recupera il menuId passato


    return(
        <View style={styles.container}>
            <Text>MenuDetail: {menuId}</Text>
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