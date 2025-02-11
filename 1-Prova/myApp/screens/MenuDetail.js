import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function MenuDetail(){
    const navigation = useNavigation();

    const route = useRoute();
    const { menuId } = route.params; // Recupera il menuId passato


    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text>MenuDetail: {menuId}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
        padding: 10,
        borderRadius: 70,
        alignItems: 'center'
    },
    backText: {
        fontSize: 40,
    },
})