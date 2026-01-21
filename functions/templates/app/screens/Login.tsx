import {BFText} from "@/components/BFText";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";
import {Alert, Linking, Platform, View, StyleSheet, useColorScheme} from "react-native";
import {useState} from "react";
import BFButton from "@/components/BFButton";
import {getAuth, signInWithEmailAndPassword} from "@react-native-firebase/auth";
import BFTextInput from "@/components/BFTextInput";
import GoogleSignInButton from "@/components/social/GoogleSignInButton";
import {authMethods} from "@/utils/auth-methods";
import {AppleAuthenticationButtonType} from "expo-apple-authentication";
import FacebookSignInButton from "@/components/social/FacebookSignInButton";
import AppleSignInButton from "@/components/social/AppleSignInButton";
import GuestSignInButton from "@/components/social/GuestSignInButton";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const showEmailAuth = authMethods.includes('Email/Password');
    const googleSignIn = authMethods.includes('Google');
    const facebookSignIn = authMethods.includes('Facebook');
    const appleSignIn = Platform.OS === 'ios' && authMethods.includes('Apple');
    const anonymousSignIn = authMethods.includes('Anonymous');

    const showOrButton = showEmailAuth && (
        googleSignIn || facebookSignIn || appleSignIn || anonymousSignIn
    );

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.container}>
                {showEmailAuth && <View style={styles.section}>
                    <View style={styles.fieldContainer}>
                        <BFText style={styles.label}>
                            Email Address
                        </BFText>
                        <View>
                            <BFTextInput
                                autoFocus={true}
                                autoCapitalize={'none'}
                                onChangeText={setEmail}
                                value={email}
                                keyboardType={'email-address'}/>
                        </View>
                    </View>
                    <View style={[styles.fieldContainer, {marginBottom: 4}]}>
                        <BFText style={styles.label}>
                            Password
                        </BFText>

                        <BFTextInput
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>
                    <BFButton
                        disabled={loggingIn}
                        onPress={() => {
                            setLoggingIn(true);
                            signInWithEmailAndPassword(getAuth(), email, password)
                                .catch(error => {
                                    Alert.alert("Error", error.message);
                                })
                                .finally(() => {
                                    setLoggingIn(false);
                                });
                        }}
                        title={'Login'}/>
                    {showOrButton && <View style={styles.orContainer}>
                        <View style={[styles.divider, {backgroundColor: isDark ? '#475569' : '#cbd5e1'}]}/>
                        <BFText style={[styles.orText, {color: isDark ? '#64748b' : '#6b7280'}]}>
                            or
                        </BFText>
                        <View style={[styles.divider, {backgroundColor: isDark ? '#475569' : '#cbd5e1'}]}/>
                    </View>}
                </View>}
                {showOrButton && <View style={styles.socialButtons}>
                    {googleSignIn && <GoogleSignInButton title={'Sign in with Google'}/>}
                    {facebookSignIn && <View><FacebookSignInButton title={'Sign in with Facebook'}/></View>}
                    {appleSignIn &&
                        <View><AppleSignInButton buttonType={AppleAuthenticationButtonType.SIGN_IN}/></View>}
                    {anonymousSignIn && (<GuestSignInButton title={'Sign in as guest'}/>)}
                </View>}
                <BFText>
                    {'By continuing, you are agreeing to our '}
                    <BFText
                        onPress={() => Linking.openURL('http://www.example.com')}
                        style={styles.link}>
                        terms of service
                    </BFText>{' and '}
                    <BFText
                        onPress={() => Linking.openURL('http://www.example.com')}
                        style={styles.link}>
                        privacy policy
                    </BFText>.
                </BFText>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    section: {
        gap: 12,
    },
    fieldContainer: {
        gap: 6,
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    divider: {
        height: 1,
        flex: 1,
    },
    orText: {
        paddingHorizontal: 8,
        textTransform: 'uppercase',
    },
    socialButtons: {
        gap: 8,
    },
    link: {
        color: '#3b82f6',
    },
});

export default LoginPage;
