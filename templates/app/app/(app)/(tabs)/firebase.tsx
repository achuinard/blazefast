import {ScrollView, View, StyleSheet} from "react-native";
import BFButton from "@/components/BFButton";
import {useRouter} from "expo-router";
import {BFText} from "@/components/BFText";

const FirebaseTab = () => {
    const router = useRouter();
    return (
        <ScrollView>
            <View style={styles.header}>
                <BFText style={styles.title}>Firebase</BFText>
                <BFText style={styles.text}>This is the Firebase tab. See examples below of each Firebase service.</BFText>
            </View>

            <View style={styles.buttonContainer}>
                <BFButton title={"Firestore"} color={'danger'} onPress={() => router.push('/firestore')}/>
                <BFButton title={"Realtime Database"} color={'warning'} onPress={() => router.push('/realtime-database')}/>
                <BFButton title={"Storage"} color={'pink'} onPress={() => router.push('/storage')}/>
                <BFButton title={"Analytics"} color={'purple'} onPress={() => router.push('/analytics')}/>
                <BFButton title={"Cloud Functions"} color={'success'} onPress={() => router.push('/cloud-functions')}/>
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
