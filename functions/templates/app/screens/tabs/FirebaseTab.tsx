import {ScrollView, View, StyleSheet} from "react-native";
import BFButton from "@/components/BFButton";
import {useNavigation} from "@react-navigation/native";
import {BFText} from "@/components/BFText";

const FirebaseTab = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.header}>
                <BFText style={styles.title}>Firebase</BFText>
                <BFText style={styles.text}>This is the Firebase tab. See examples below of each Firebase service.</BFText>
            </View>

            <View style={styles.buttonContainer}>
                <BFButton title={"Firestore"} color={'danger'} onPress={() => navigation.navigate('Firestore')}/>
                <BFButton title={"Realtime Database"} color={'warning'} onPress={() => navigation.navigate('Realtime Database')}/>
                <BFButton title={"Storage"} color={'pink'} onPress={() => navigation.navigate('Storage')}/>
                <BFButton title={"Analytics"} color={'purple'} onPress={() => navigation.navigate('Analytics')}/>
                <BFButton title={"Cloud Functions"} color={'success'} onPress={() => navigation.navigate('Cloud Functions')}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
    },
    buttonContainer: {
        gap: 8,
        padding: 16,
    },
});

export default FirebaseTab;
