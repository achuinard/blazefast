import {Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {BFText} from "@/components/BFText";

const GoogleSignInButton = ({title, ...rest}: {
    title: string;
}) => {
    return (
        <TouchableOpacity
            {...rest}
            onPress={() => {
                (async () => {
                    try {
                        await GoogleSignin.hasPlayServices({
                            showPlayServicesUpdateDialog: true,
                        });
                        const {idToken} = await GoogleSignin.signIn();
                        const googleCredential =
                            auth.GoogleAuthProvider.credential(idToken);

                        await auth().signInWithCredential(googleCredential);

                    } catch (e) {
                        Alert.alert('Error', 'There was an error signing in with Google.');
                    }
                })();
            }}
            style={styles.button}>
            <FontAwesome name={'google'} color={'#ffffff'} size={12}/>
            <BFText style={styles.text}>{title}</BFText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EA4335',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
});

export default GoogleSignInButton;
