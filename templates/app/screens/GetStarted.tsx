import {BFText} from "@/components/BFText";
import {useNavigation} from "@react-navigation/native";
import {Image, View, StyleSheet, useColorScheme} from "react-native";
import BFButton from "@/components/BFButton";

const GetStartedPage = () => {
    const nav = useNavigation();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View style={[styles.container, {backgroundColor: isDark ? '#1e293b' : '#f1f5f9'}]}>
            <View style={styles.content}>
                <Image
                    source={require('../assets/images/icon.png')}
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <BFText style={styles.title}>
                        BlazeFast React Native Starter
                    </BFText>
                    <BFText style={styles.subtitle}>
                        Edit this in <BFText style={styles.bold}>screens/GetStarted.tsx</BFText>
                    </BFText>
                </View>

                <View style={styles.buttonContainer}>
                    <BFButton color={'primary'} title={'Sign Up'} onPress={() => nav.navigate('Register' as never)}/>
                    <BFButton title={'Login'} color={'pink'} onPress={() => nav.navigate('Login' as never)}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        paddingHorizontal: 8,
    },
    icon: {
        height: 64,
        width: 64,
        borderRadius: 12,
    },
    textContainer: {
        gap: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    bold: {
        fontWeight: '600',
    },
    buttonContainer: {
        width: '100%',
        gap: 8,
    },
});

export default GetStartedPage;
