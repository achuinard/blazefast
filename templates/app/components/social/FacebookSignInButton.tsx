import {Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {BFText} from "@/components/BFText";

const FacebookSignInButton = ({title, ...rest}: {
    title: string;
}) => {
    return (
        <TouchableOpacity
            {...rest}
            onPress={() => {
                LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                    result => {
                        if (!result.isCancelled) {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    if (data) {
                                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                                        auth().signInWithCredential(facebookCredential);
                                    }
                                }
                            );
                        } else {
                            Alert.alert('Error', 'The user cancelled the Facebook login.');
                        }
                    },
                    error => {
                        Alert.alert('Error', 'There was an error signing in with Facebook.');
                    });
            }}
            style={styles.button}>
            <FontAwesome name={'facebook'} color={'#ffffff'} size={12}/>
            <BFText style={styles.text}>{title}</BFText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4267B2',
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

export default FacebookSignInButton;
