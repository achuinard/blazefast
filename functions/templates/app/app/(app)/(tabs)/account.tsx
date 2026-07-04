import {ScrollView, View, StyleSheet} from "react-native";
import BFButton from "@/components/BFButton";
import {BFText} from "@/components/BFText";
import {getAuth} from "@react-native-firebase/auth";

const AccountTab = () => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <BFText style={styles.title}>Account</BFText>
                <BFText style={styles.text}>You are currently logged in as <BFText style={styles.bold}>
                    {getAuth().currentUser?.email ? getAuth().currentUser?.email : 'a guest'}</BFText> and your Firebase UID
                    is <BFText style={styles.bold}>{getAuth().currentUser?.uid}.</BFText>
                </BFText>
            </View>

            <View style={styles.buttonContainer}>
                <BFButton title={"Sign Out"} color={'danger'} onPress={() => getAuth().signOut()}/>
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
    bold: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        gap: 8,
        paddingHorizontal: 16,
    },
});

export default AccountTab;
