import {Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType,
    AppleAuthenticationScope,
    signInAsync
} from "expo-apple-authentication";

const AppleSignInButton = ({buttonType}: {
    buttonType: AppleAuthenticationButtonType;
}) => {
    let onPress = async () => {
        try {
            const {state, identityToken} = await signInAsync({
                requestedScopes: [
                    AppleAuthenticationScope.EMAIL,
                ],
            })

            const credential = auth.AppleAuthProvider.credential(
                identityToken,
                state || undefined
            )

            return auth().signInWithCredential(credential);
        } catch (e) {
            Alert.alert("Error", "There was an error signing in with Apple.");

        }
    };
    return (
        <AppleAuthenticationButton
            cornerRadius={5}
            style={styles.button}
            onPress={onPress}
            buttonType={buttonType}
            buttonStyle={AppleAuthenticationButtonStyle.BLACK}/>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
    },
});

export default AppleSignInButton;
